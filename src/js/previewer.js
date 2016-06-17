'use strict';

export default class Previewer {
    constructor({ previewerBg='#ccc', height=465, onOpened, onClosed }={}) {
        this.previewerBg = previewerBg;
        this.height = height;
        this.onOpened = onOpened;
        this.onClosed = onClosed;
        this._node = document.createElement('div');
        this._node.classList.add('galleria-previewer');
        this._node.style.backgroundColor = this.previewerBg;
        this._transitionEndEvent = this._findTransitionEvent();
        this._node.addEventListener(this._transitionEndEvent, this._onTransitionEnd.bind(this));
        this._opened = false;
    }

    getNode() {
        return this._node;
    }

    open(delay=50) {
        setTimeout(_ => {
            this._node.style.height = `${this.height}px`;
        }, delay);
    }

    close(delay=0) {

    }

    _findTransitionEvent() {
        if (this._node) {
            let t;
            const transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            }

            for (t in transitions) {
                if (this._node.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        }

        return null;
    }

    _onTransitionEnd(event) {
        if (event.propertyName === 'height') {
            if (!this._opened) {
                this._opened = true;

                if (typeof this.onOpened === 'function') {
                    this.onOpened(this);
                }
            }
            else {
                if (typeof this.onClosed === 'function') {
                    this.onClosed(this);
                }

                this._opened = false;
            }
        }
    }
}
