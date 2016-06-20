'use strict';

export default class Thumbnail {
    constructor({ data, thumbnailWidth=175, onThumbnailCanExpand, onThumbnailCanCollapse }={}) {
        this.data = data;

        this.thumbnailWidth = thumbnailWidth;
        this.onThumbnailCanExpand = onThumbnailCanExpand;
        this.onThumbnailCanCollapse = onThumbnailCanCollapse;
        this._expanded = false;

        // setup nodes
        this._node = document.createElement('div');
        this._node.classList.add('galleria-thumbnail');
        this._node.style.width = `${thumbnailWidth}px`;

        if (this.data) {
            this._id = this.data.id;
            this._node.addEventListener('click', this._onClick.bind(this));
            this._imgNode = document.createElement('img');
            this._imgNode.addEventListener('load', this._onImageLoaded.bind(this));
            this._node.appendChild(this._imgNode);
        }
    }

    init() {
        if (this.data && this._imgNode) {
            this._imgNode.src = this.data.src;
        }
    }

    getId() {
        return this._id;
    }

    getNode() {
        return this._node;
    }

    toggleExpand() {
        let proceed = true;
        this._expanded = !this._expanded;

        if (this._expanded) {
            if (typeof this.onThumbnailCanExpand === 'function') {
                proceed = this.onThumbnailCanExpand(this);
            }
        }
        else {
            if (typeof this.onThumbnailCanCollapse === 'function') {
                proceed = this.onThumbnailCanCollapse(this);
            }
        }

        if (proceed) {
            if (this._expanded) {
                this._node.classList.add('expanded');
            }
            else {
                this._node.classList.remove('expanded');
            }
        }
    }

    _onClick(evt) {
        this.toggleExpand();
    }

    _onImageLoaded(evt) {

    }
}
