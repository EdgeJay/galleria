'use strict';

import TWEEN from 'tween.js';
import Thumbnail from './thumbnail';
import Previewer from './previewer';

export default class Section {
    constructor({ data, thumbnailWidth, previewerBg='#ccc', previewerHeight,
                  sectionTitleElementName='h2', titleElementName='h2',
                  onThumbnailCreated, onThumbnailCanExpand, onThumbnailWillExpand,
                  onThumbnailDidExpand, onThumbnailCanCollapse, onThumbnailWillCollapse,
                  onThumbnailDidCollapse, scrollOffset=20 }={}) {

        this._node = null;
        this.data = data;
        this._id = data.id;
        this.thumbnailWidth = thumbnailWidth;
        this.previewerBg = previewerBg;
        this.previewerHeight = previewerHeight;
        this.sectionTitleElementName = sectionTitleElementName;
        this.titleElementName = titleElementName;
        this.onThumbnailCreated = onThumbnailCreated;
        this.onThumbnailCanExpand = onThumbnailCanExpand;
        this.onThumbnailWillExpand = onThumbnailWillExpand;
        this.onThumbnailDidExpand = onThumbnailDidExpand;
        this.onThumbnailCanCollapse = onThumbnailCanCollapse;
        this.onThumbnailWillCollapse = onThumbnailWillCollapse;
        this.onThumbnailDidCollapse = onThumbnailDidCollapse;
        this.scrollOffset = scrollOffset;
        this.thumbnails = [];
        this._previewer = null;
        this._expandedThumbnail = null;
    }

    init() {
        if (typeof this.data !== 'object') {
            throw new Error('[Galleria] Unable to init section. Data must be of object type.');
        }

        this._node = document.createElement('div');
        this._node.classList.add('galleria-section');

        this.recreateThumbnails();
    }

    getId() {
        return this._id;
    }

    getNode() {
        return this._node;
    }

    getPreviewer() {
        return this._previewer;
    }

    clearThumbnails() {
        if (this._node) {
            while (this._node.firstChild) {
                this._node.removeChild(this._node.firstChild);
            }
        }

        this.thumbnails = [];
    }

    recreateThumbnails() {
        if (this._node) {
            this.clearThumbnails();

            var i = 0, thumbnail = null, data = null;

            while (i < this.data.thumbnails.length) {
                if (typeof this.data.thumbnails[i] === 'object') {
                    data = Object.assign({}, this.data.thumbnails[i]);

                    if (!data.id) {
                        data.id = `thumbnail_${Date.now()}_${i}`;
                    }

                    thumbnail = new Thumbnail({
                        data,
                        width: this.thumbnailWidth,
                        onThumbnailCanExpand: this._onThumbnailCanExpand.bind(this),
                        onThumbnailCanCollapse: this._onThumbnailCanCollapse.bind(this)
                    });

                    this.thumbnails.push(thumbnail);

                    thumbnail.init();
                    this._node.appendChild(thumbnail.getNode());

                    // dispatch
                    if (typeof this.onThumbnailCreated === 'function') {
                        this.onThumbnailCreated(this, thumbnail.getId(), thumbnail.getNode());
                    }
                }

                i++;
            }
        }
    }

    addPreviewer(thumbnail) {
        if (!this._previewer && thumbnail && thumbnail.getNode().parentNode) {
            this._previewer = new Previewer({
                background: this.previewerBg,
                previewerHeight: this.previewerHeight,
                onOpened: this._onPreviewerOpened.bind(this),
                onClosed: this._onPreviewerClosed.bind(this)
            });

            if (thumbnail.getNode().nextSibling) {
                thumbnail.getNode().parentNode.insertBefore(this._previewer.getNode(), thumbnail.getNode().nextSibling);
            }
            else {
                thumbnail.getNode().parentNode.appendChild(this._previewer.getNode());
            }

            this._previewer.open();
        }
    }

    removePreviewer() {
        if (this._previewer) {
            if (this._previewer.getNode() && this._previewer.getNode().parentNode) {
                this._previewer.getNode().parentNode.removeChild(this._previewer.getNode());
            }

            this._previewer = null;
        }
    }

    collapseThumbnail() {
        if (this._expandedThumbnail) {
            this._expandedThumbnail.toggleExpand();
            this.removePreviewer();
            this._expandedThumbnail = null;
        }
    }

    _onThumbnailCanExpand(thumbnail) {
        let proceed = true;

        if (typeof this.onThumbnailCanExpand === 'function') {
            proceed = this.onThumbnailCanExpand(this, thumbnail.getId());
        }

        if (proceed) {
            if (this._expandedThumbnail && this._expandedThumbnail != thumbnail) {
                this._expandedThumbnail.toggleExpand();
            }

            this._expandedThumbnail = thumbnail;

            this.removePreviewer();
            this.addPreviewer(thumbnail);

            if (typeof this.onThumbnailWillExpand === 'function') {
                this.onThumbnailWillExpand(this, thumbnail.data, thumbnail.getNode(), this._previewer);
            }

            // scroll window to location of thumbnail
            const pos = this._getPositionInPage(this._expandedThumbnail.getNode());
            let coords = { x: window.scrollX, y: window.scrollY },
                tween = new TWEEN.Tween(coords)
                        .to({ x: 0, y: pos.y - this.scrollOffset }, 300)
                        .onUpdate(function() {
                            window.scrollTo(this.x, this.y);
                        })
                        .onComplete(_ => {
                            if (typeof this.onThumbnailDidExpand === 'function') {
                                this.onThumbnailDidExpand(this, thumbnail.data, thumbnail.getNode(), this._previewer);
                            }
                        })
                        .start();
        }

        return proceed;
    }

    _onThumbnailCanCollapse(thumbnail) {
        let proceed = true;

        if (typeof this.onThumbnailCanCollapse === 'function') {
            proceed = this.onThumbnailCanCollapse(this, thumbnail.getId());
        }

        if (proceed) {
            if (typeof this.onThumbnailWillCollapse === 'function') {
                this.onThumbnailWillCollapse(this, thumbnail.data, thumbnail.getNode(), this._previewer);
            }

            this.removePreviewer();
            this._expandedThumbnail = null;

            if (typeof this.onThumbnailDidCollapse === 'function') {
                this.onThumbnailDidCollapse(this, thumbnail.data, thumbnail.getNode());
            }
        }

        return proceed;
    }

    _onPreviewerOpened(previewer) {
    }

    _onPreviewerClosed(previewer) {
        console.log('closed');
    }

    _getPositionInPage(elem) {
        let x = 0, y = 0;

        if (elem.offsetParent) {
            do {
                x += elem.offsetLeft;
                y += elem.offsetTop;
            } while (elem = elem.offsetParent);
        }

        return { x, y };
    }
}
