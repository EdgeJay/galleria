'use strict';

import TWEEN from 'tween.js';
import Section from './section';
import styles from '../css/galleria.css';
import polyfills from './polyfills';

polyfills();

export default class Galleria {
    constructor({ container, thumbnailWidth,
                  sectionTitleElementName='h2', titleElementName='h2', previewerBg='#ccc',
                  onSectionCreated, onThumbnailCreated,
                  onThumbnailCanExpand, onThumbnailWillExpand,
                  onThumbnailDidExpand, onThumbnailCanCollapse,
                  onThumbnailWillCollapse, onThumbnailDidCollapse,
                  scrollOffset=20 }={}) {

        this.container = container;
        this.thumbnailWidth = thumbnailWidth;
        this.sectionTitleElementName = sectionTitleElementName;
        this.titleElementName = titleElementName;
        this.previewerBg = previewerBg;
        this.onSectionCreated = onSectionCreated;
        this.onThumbnailCreated = onThumbnailCreated;
        this.onThumbnailCanExpand = onThumbnailCanExpand;
        this.onThumbnailWillExpand = onThumbnailWillExpand;
        this.onThumbnailDidExpand = onThumbnailDidExpand;
        this.onThumbnailCanCollapse = onThumbnailCanCollapse;
        this.onThumbnailWillCollapse = onThumbnailWillCollapse;
        this.onThumbnailDidCollapse = onThumbnailDidCollapse;
        this.scrollOffset = scrollOffset;
        this.sections = [];
        this._expandedSection = null;
    }

    load(data) {
        if (!Array.isArray(data)) {
            throw new Error('[Galleria] Unable to load data, expected type array.');
        }

        if (!(this.container && this.container.nodeType === Node.ELEMENT_NODE)) {
            throw new Error('[Galleria] Container is not a valid node element.');
        }

        this.container.classList.add('galleria');
        this.clearContainer();

        var i = 0, _data = [];

        while (i < data.length) {
            if (typeof data[i] === 'object') {
                _data.push(Object.assign({}, data[i]));

                // if id is not present, make one
                if (!_data[_data.length - 1].id) {
                    _data[_data.length - 1].id = `section_${Date.now()}_${i}`;
                }
            }
            i++;
        }

        var section = null;
        i = 0;

        while (i < _data.length) {
            section = new Section({
                data: _data[i],
                previewerBg: this.previewerBg,
                previewerHeight: this.previewerHeight,
                onThumbnailCreated: this._onThumbnailCreated.bind(this),
                onThumbnailCanExpand: this._onThumbnailCanExpand.bind(this),
                onThumbnailWillExpand: this._onThumbnailWillExpand.bind(this),
                onThumbnailDidExpand: this._onThumbnailDidExpand.bind(this),
                onThumbnailCanCollapse: this._onThumbnailCanCollapse.bind(this),
                onThumbnailWillCollapse: this._onThumbnailWillCollapse.bind(this),
                onThumbnailDidCollapse: this._onThumbnailDidCollapse.bind(this),
                scrollOffset: this.scrollOffset
            });

            this.sections.push(section);

            section.init();
            this.container.appendChild(section.getNode());

            if (typeof this.onSectionCreated === 'function') {
                this.onSectionCreated(_data[i].id, _data[i], section);
            }

            i++;
        }
    }

    clearContainer() {
        if (this.container && this.container.nodeType === Node.ELEMENT_NODE && this.container.hasChildNodes()) {
            while (this.container.firstChild) {
                this.container.removeChild(this.container.firstChild);
            }
        }

        this.sections = [];
    }

    _onThumbnailCreated(section, thumbnailId, elem) {
        if (typeof this.onThumbnailCreated === 'function') {
            this.onThumbnailCreated(section.getId(), thumbnailId, elem);
        }
    }

    _onThumbnailCanExpand(section, thumbnailId) {
        let proceed = true;

        if (typeof this.onThumbnailCanExpand === 'function') {
            proceed = this.onThumbnailCanExpand(section.getId(), thumbnailId);
        }

        if (proceed) {
            if (this._expandedSection && this._expandedSection !== section) {
                this._expandedSection.collapseThumbnail();
            }

            this._expandedSection = section;
        }

        return proceed;
    };

    _onThumbnailWillExpand(section, thumbnailData, thumbnail, previewer) {
        if (typeof this.onThumbnailWillExpand === 'function') {
            this.onThumbnailWillExpand(section.getId(), thumbnailData, thumbnail, previewer);
        }
    };

    _onThumbnailDidExpand(section, thumbnailData, thumbnail, previewer) {
        if (typeof this.onThumbnailDidExpand === 'function') {
            this.onThumbnailDidExpand(section.getId(), thumbnailData, thumbnail, previewer);
        }
    };

    _onThumbnailCanCollapse(section, thumbnailId) {
        let proceed = true;

        if (typeof this.onThumbnailCanCollapse === 'function') {
            proceed = this.onThumbnailCanCollapse(section.getId(), thumbnailId);
        }

        return proceed;
    };

    _onThumbnailWillCollapse(section, thumbnailData, thumbnail, previewer) {
        if (typeof this.onThumbnailWillCollapse === 'function') {
            this.onThumbnailWillCollapse(section.getId(), thumbnailData, thumbnail, previewer);
        }
    };

    _onThumbnailDidCollapse(section, thumbnailData, thumbnail) {
        if (typeof this.onThumbnailDidCollapse === 'function') {
            this.onThumbnailDidCollapse(section.getId(), thumbnailData, thumbnail);
        }
    };
}

// kickstart animations
function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}

requestAnimationFrame(animate);

window.Galleria = Galleria;
