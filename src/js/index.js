'use strict';

import polyfills from './polyfills';

polyfills();

export Galleria from './galleria';
window.Galleria = exports.Galleria;
