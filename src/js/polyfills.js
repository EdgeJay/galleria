'use strict';

export default function polyfills() {
    if (!Array.isArray) {
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }
}
