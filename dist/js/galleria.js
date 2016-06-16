/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Galleria = undefined;
	
	var _polyfills = __webpack_require__(1);
	
	var _polyfills2 = _interopRequireDefault(_polyfills);
	
	var _galleria = __webpack_require__(2);
	
	var _galleria2 = _interopRequireDefault(_galleria);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _polyfills2.default)();
	
	exports.Galleria = _galleria2.default;
	
	window.Galleria = exports.Galleria;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = polyfills;
	function polyfills() {
	    if (!Array.isArray) {
	        Array.isArray = function (arg) {
	            return Object.prototype.toString.call(arg) === '[object Array]';
	        };
	    }
	
	    if (!Date.now) {
	        Date.now = function now() {
	            return new Date().getTime();
	        };
	    }
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tween = __webpack_require__(3);
	
	var _tween2 = _interopRequireDefault(_tween);
	
	var _section = __webpack_require__(4);
	
	var _section2 = _interopRequireDefault(_section);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Galleria = function () {
	    function Galleria() {
	        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        var container = _ref.container;
	        var thumbnailWidth = _ref.thumbnailWidth;
	        var _ref$sectionTitleElem = _ref.sectionTitleElementName;
	        var sectionTitleElementName = _ref$sectionTitleElem === undefined ? 'h2' : _ref$sectionTitleElem;
	        var _ref$titleElementName = _ref.titleElementName;
	        var titleElementName = _ref$titleElementName === undefined ? 'h2' : _ref$titleElementName;
	        var onThumbnailCreated = _ref.onThumbnailCreated;
	        var onThumbnailCanExpand = _ref.onThumbnailCanExpand;
	        var onThumbnailWillExpand = _ref.onThumbnailWillExpand;
	        var onThumbnailDidExpand = _ref.onThumbnailDidExpand;
	        var onThumbnailCanCollapse = _ref.onThumbnailCanCollapse;
	        var onThumbnailWillCollapse = _ref.onThumbnailWillCollapse;
	        var onThumbnailDidCollapse = _ref.onThumbnailDidCollapse;
	
	        _classCallCheck(this, Galleria);
	
	        this.container = container;
	        this.thumbnailWidth = thumbnailWidth;
	        this.sectionTitleElementName = sectionTitleElementName;
	        this.titleElementName = titleElementName;
	        this.onThumbnailCreated = onThumbnailCreated;
	        this.onThumbnailCanExpand = onThumbnailCanExpand;
	        this.onThumbnailWillExpand = onThumbnailWillExpand;
	        this.onThumbnailDidExpand = onThumbnailDidExpand;
	        this.onThumbnailCanCollapse = onThumbnailCanCollapse;
	        this.onThumbnailWillCollapse = onThumbnailWillCollapse;
	        this.onThumbnailDidCollapse = onThumbnailDidCollapse;
	        this.sections = [];
	        this._expandedSection = null;
	    }
	
	    _createClass(Galleria, [{
	        key: 'load',
	        value: function load(data) {
	            if (!Array.isArray(data)) {
	                throw new Error('[Galleria] Unable to load data, expected type array.');
	            }
	
	            if (!(this.container && this.container.nodeType === Node.ELEMENT_NODE)) {
	                throw new Error('[Galleria] Container is not a valid node element.');
	            }
	
	            this.container.classList.add('galleria');
	            this.clearContainer();
	
	            var i = 0,
	                _data = [];
	
	            while (i < data.length) {
	                if (_typeof(data[i]) === 'object') {
	                    _data.push(Object.assign({}, data[i]));
	
	                    // if id is not present, make one
	                    if (!_data[_data.length - 1].id) {
	                        _data[_data.length - 1].id = 'section_' + Date.now() + '_' + i;
	                    }
	                }
	                i++;
	            }
	
	            var section = null;
	            i = 0;
	
	            while (i < _data.length) {
	                section = new _section2.default({
	                    data: _data[i],
	                    onThumbnailCreated: this._onThumbnailCreated.bind(this),
	                    onThumbnailCanExpand: this._onThumbnailCanExpand.bind(this),
	                    onThumbnailWillExpand: this._onThumbnailWillExpand.bind(this),
	                    onThumbnailDidExpand: this._onThumbnailDidExpand.bind(this),
	                    onThumbnailCanCollapse: this._onThumbnailCanCollapse.bind(this),
	                    onThumbnailWillCollapse: this._onThumbnailWillCollapse.bind(this),
	                    onThumbnailDidCollapse: this._onThumbnailDidCollapse.bind(this)
	                });
	
	                this.sections.push(section);
	
	                section.init();
	                this.container.appendChild(section.getNode());
	
	                i++;
	            }
	        }
	    }, {
	        key: 'clearContainer',
	        value: function clearContainer() {
	            if (this.container && this.container.nodeType === Node.ELEMENT_NODE && this.container.hasChildNodes()) {
	                while (this.container.firstChild) {
	                    this.container.removeChild(this.container.firstChild);
	                }
	            }
	
	            this.sections = [];
	        }
	    }, {
	        key: '_onThumbnailCreated',
	        value: function _onThumbnailCreated(section, thumbnailId, elem) {
	            if (typeof this.onThumbnailCreated === 'function') {
	                this.onThumbnailCreated(section.getId(), thumbnailId, elem);
	            }
	        }
	    }, {
	        key: '_onThumbnailCanExpand',
	        value: function _onThumbnailCanExpand(section, thumbnailId) {
	            var proceed = true;
	
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
	        }
	    }, {
	        key: '_onThumbnailWillExpand',
	        value: function _onThumbnailWillExpand(section, thumbnailData, thumbnail, previewer) {
	            if (typeof this.onThumbnailWillExpand === 'function') {
	                this.onThumbnailWillExpand(section.getId(), thumbnailData, thumbnail, previewer);
	            }
	        }
	    }, {
	        key: '_onThumbnailDidExpand',
	        value: function _onThumbnailDidExpand(section, thumbnailData, thumbnail, previewer) {
	            if (typeof this.onThumbnailDidExpand === 'function') {
	                this.onThumbnailDidExpand(section.getId(), thumbnailData, thumbnail, previewer);
	            }
	        }
	    }, {
	        key: '_onThumbnailCanCollapse',
	        value: function _onThumbnailCanCollapse(section, thumbnailId) {
	            var proceed = true;
	
	            if (typeof this.onThumbnailCanCollapse === 'function') {
	                proceed = this.onThumbnailCanCollapse(section.getId(), thumbnailId);
	            }
	
	            return proceed;
	        }
	    }, {
	        key: '_onThumbnailWillCollapse',
	        value: function _onThumbnailWillCollapse(section, thumbnailData, thumbnail, previewer) {
	            if (typeof this.onThumbnailWillCollapse === 'function') {
	                this.onThumbnailWillCollapse(section.getId(), thumbnailData, thumbnail, previewer);
	            }
	        }
	    }, {
	        key: '_onThumbnailDidCollapse',
	        value: function _onThumbnailDidCollapse(section, thumbnailData, thumbnail) {
	            if (typeof this.onThumbnailDidCollapse === 'function') {
	                this.onThumbnailDidCollapse(section.getId(), thumbnailData, thumbnail);
	            }
	        }
	    }]);
	
	    return Galleria;
	}();
	
	// kickstart animations
	
	
	exports.default = Galleria;
	function animate(time) {
	    requestAnimationFrame(animate);
	    _tween2.default.update(time);
	}
	
	requestAnimationFrame(animate);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Tween.js - Licensed under the MIT license
	 * https://github.com/tweenjs/tween.js
	 * ----------------------------------------------
	 *
	 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
	 * Thank you all, you're awesome!
	 */
	
	// Include a performance.now polyfill
	(function () {
	
		if ('performance' in window === false) {
			window.performance = {};
		}
	
		// IE 8
		Date.now = (Date.now || function () {
			return new Date().getTime();
		});
	
		if ('now' in window.performance === false) {
			var offset = window.performance.timing && window.performance.timing.navigationStart ? window.performance.timing.navigationStart
			                                                                                    : Date.now();
	
			window.performance.now = function () {
				return Date.now() - offset;
			};
		}
	
	})();
	
	var TWEEN = TWEEN || (function () {
	
		var _tweens = [];
	
		return {
	
			getAll: function () {
	
				return _tweens;
	
			},
	
			removeAll: function () {
	
				_tweens = [];
	
			},
	
			add: function (tween) {
	
				_tweens.push(tween);
	
			},
	
			remove: function (tween) {
	
				var i = _tweens.indexOf(tween);
	
				if (i !== -1) {
					_tweens.splice(i, 1);
				}
	
			},
	
			update: function (time) {
	
				if (_tweens.length === 0) {
					return false;
				}
	
				var i = 0;
	
				time = time !== undefined ? time : window.performance.now();
	
				while (i < _tweens.length) {
	
					if (_tweens[i].update(time)) {
						i++;
					} else {
						_tweens.splice(i, 1);
					}
	
				}
	
				return true;
	
			}
		};
	
	})();
	
	TWEEN.Tween = function (object) {
	
		var _object = object;
		var _valuesStart = {};
		var _valuesEnd = {};
		var _valuesStartRepeat = {};
		var _duration = 1000;
		var _repeat = 0;
		var _yoyo = false;
		var _isPlaying = false;
		var _reversed = false;
		var _delayTime = 0;
		var _startTime = null;
		var _easingFunction = TWEEN.Easing.Linear.None;
		var _interpolationFunction = TWEEN.Interpolation.Linear;
		var _chainedTweens = [];
		var _onStartCallback = null;
		var _onStartCallbackFired = false;
		var _onUpdateCallback = null;
		var _onCompleteCallback = null;
		var _onStopCallback = null;
	
		// Set all starting values present on the target object
		for (var field in object) {
			_valuesStart[field] = parseFloat(object[field], 10);
		}
	
		this.to = function (properties, duration) {
	
			if (duration !== undefined) {
				_duration = duration;
			}
	
			_valuesEnd = properties;
	
			return this;
	
		};
	
		this.start = function (time) {
	
			TWEEN.add(this);
	
			_isPlaying = true;
	
			_onStartCallbackFired = false;
	
			_startTime = time !== undefined ? time : window.performance.now();
			_startTime += _delayTime;
	
			for (var property in _valuesEnd) {
	
				// Check if an Array was provided as property value
				if (_valuesEnd[property] instanceof Array) {
	
					if (_valuesEnd[property].length === 0) {
						continue;
					}
	
					// Create a local copy of the Array with the start value at the front
					_valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);
	
				}
	
				// If `to()` specifies a property that doesn't exist in the source object,
				// we should not set that property in the object
				if (_valuesStart[property] === undefined) {
					continue;
				}
	
				_valuesStart[property] = _object[property];
	
				if ((_valuesStart[property] instanceof Array) === false) {
					_valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
				}
	
				_valuesStartRepeat[property] = _valuesStart[property] || 0;
	
			}
	
			return this;
	
		};
	
		this.stop = function () {
	
			if (!_isPlaying) {
				return this;
			}
	
			TWEEN.remove(this);
			_isPlaying = false;
	
			if (_onStopCallback !== null) {
				_onStopCallback.call(_object);
			}
	
			this.stopChainedTweens();
			return this;
	
		};
	
		this.stopChainedTweens = function () {
	
			for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
				_chainedTweens[i].stop();
			}
	
		};
	
		this.delay = function (amount) {
	
			_delayTime = amount;
			return this;
	
		};
	
		this.repeat = function (times) {
	
			_repeat = times;
			return this;
	
		};
	
		this.yoyo = function (yoyo) {
	
			_yoyo = yoyo;
			return this;
	
		};
	
	
		this.easing = function (easing) {
	
			_easingFunction = easing;
			return this;
	
		};
	
		this.interpolation = function (interpolation) {
	
			_interpolationFunction = interpolation;
			return this;
	
		};
	
		this.chain = function () {
	
			_chainedTweens = arguments;
			return this;
	
		};
	
		this.onStart = function (callback) {
	
			_onStartCallback = callback;
			return this;
	
		};
	
		this.onUpdate = function (callback) {
	
			_onUpdateCallback = callback;
			return this;
	
		};
	
		this.onComplete = function (callback) {
	
			_onCompleteCallback = callback;
			return this;
	
		};
	
		this.onStop = function (callback) {
	
			_onStopCallback = callback;
			return this;
	
		};
	
		this.update = function (time) {
	
			var property;
			var elapsed;
			var value;
	
			if (time < _startTime) {
				return true;
			}
	
			if (_onStartCallbackFired === false) {
	
				if (_onStartCallback !== null) {
					_onStartCallback.call(_object);
				}
	
				_onStartCallbackFired = true;
	
			}
	
			elapsed = (time - _startTime) / _duration;
			elapsed = elapsed > 1 ? 1 : elapsed;
	
			value = _easingFunction(elapsed);
	
			for (property in _valuesEnd) {
	
				// Don't update properties that do not exist in the source object
				if (_valuesStart[property] === undefined) {
					continue;
				}
	
				var start = _valuesStart[property] || 0;
				var end = _valuesEnd[property];
	
				if (end instanceof Array) {
	
					_object[property] = _interpolationFunction(end, value);
	
				} else {
	
					// Parses relative end values with start as base (e.g.: +10, -3)
					if (typeof (end) === 'string') {
	
						if (end.startsWith('+') || end.startsWith('-')) {
							end = start + parseFloat(end, 10);
						} else {
							end = parseFloat(end, 10);
						}
					}
	
					// Protect against non numeric properties.
					if (typeof (end) === 'number') {
						_object[property] = start + (end - start) * value;
					}
	
				}
	
			}
	
			if (_onUpdateCallback !== null) {
				_onUpdateCallback.call(_object, value);
			}
	
			if (elapsed === 1) {
	
				if (_repeat > 0) {
	
					if (isFinite(_repeat)) {
						_repeat--;
					}
	
					// Reassign starting values, restart by making startTime = now
					for (property in _valuesStartRepeat) {
	
						if (typeof (_valuesEnd[property]) === 'string') {
							_valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property], 10);
						}
	
						if (_yoyo) {
							var tmp = _valuesStartRepeat[property];
	
							_valuesStartRepeat[property] = _valuesEnd[property];
							_valuesEnd[property] = tmp;
						}
	
						_valuesStart[property] = _valuesStartRepeat[property];
	
					}
	
					if (_yoyo) {
						_reversed = !_reversed;
					}
	
					_startTime = time + _delayTime;
	
					return true;
	
				} else {
	
					if (_onCompleteCallback !== null) {
						_onCompleteCallback.call(_object);
					}
	
					for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
						// Make the chained tweens start exactly at the time they should,
						// even if the `update()` method was called way past the duration of the tween
						_chainedTweens[i].start(_startTime + _duration);
					}
	
					return false;
	
				}
	
			}
	
			return true;
	
		};
	
	};
	
	
	TWEEN.Easing = {
	
		Linear: {
	
			None: function (k) {
	
				return k;
	
			}
	
		},
	
		Quadratic: {
	
			In: function (k) {
	
				return k * k;
	
			},
	
			Out: function (k) {
	
				return k * (2 - k);
	
			},
	
			InOut: function (k) {
	
				if ((k *= 2) < 1) {
					return 0.5 * k * k;
				}
	
				return - 0.5 * (--k * (k - 2) - 1);
	
			}
	
		},
	
		Cubic: {
	
			In: function (k) {
	
				return k * k * k;
	
			},
	
			Out: function (k) {
	
				return --k * k * k + 1;
	
			},
	
			InOut: function (k) {
	
				if ((k *= 2) < 1) {
					return 0.5 * k * k * k;
				}
	
				return 0.5 * ((k -= 2) * k * k + 2);
	
			}
	
		},
	
		Quartic: {
	
			In: function (k) {
	
				return k * k * k * k;
	
			},
	
			Out: function (k) {
	
				return 1 - (--k * k * k * k);
	
			},
	
			InOut: function (k) {
	
				if ((k *= 2) < 1) {
					return 0.5 * k * k * k * k;
				}
	
				return - 0.5 * ((k -= 2) * k * k * k - 2);
	
			}
	
		},
	
		Quintic: {
	
			In: function (k) {
	
				return k * k * k * k * k;
	
			},
	
			Out: function (k) {
	
				return --k * k * k * k * k + 1;
	
			},
	
			InOut: function (k) {
	
				if ((k *= 2) < 1) {
					return 0.5 * k * k * k * k * k;
				}
	
				return 0.5 * ((k -= 2) * k * k * k * k + 2);
	
			}
	
		},
	
		Sinusoidal: {
	
			In: function (k) {
	
				return 1 - Math.cos(k * Math.PI / 2);
	
			},
	
			Out: function (k) {
	
				return Math.sin(k * Math.PI / 2);
	
			},
	
			InOut: function (k) {
	
				return 0.5 * (1 - Math.cos(Math.PI * k));
	
			}
	
		},
	
		Exponential: {
	
			In: function (k) {
	
				return k === 0 ? 0 : Math.pow(1024, k - 1);
	
			},
	
			Out: function (k) {
	
				return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);
	
			},
	
			InOut: function (k) {
	
				if (k === 0) {
					return 0;
				}
	
				if (k === 1) {
					return 1;
				}
	
				if ((k *= 2) < 1) {
					return 0.5 * Math.pow(1024, k - 1);
				}
	
				return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);
	
			}
	
		},
	
		Circular: {
	
			In: function (k) {
	
				return 1 - Math.sqrt(1 - k * k);
	
			},
	
			Out: function (k) {
	
				return Math.sqrt(1 - (--k * k));
	
			},
	
			InOut: function (k) {
	
				if ((k *= 2) < 1) {
					return - 0.5 * (Math.sqrt(1 - k * k) - 1);
				}
	
				return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
	
			}
	
		},
	
		Elastic: {
	
			In: function (k) {
	
				var s;
				var a = 0.1;
				var p = 0.4;
	
				if (k === 0) {
					return 0;
				}
	
				if (k === 1) {
					return 1;
				}
	
				if (!a || a < 1) {
					a = 1;
					s = p / 4;
				} else {
					s = p * Math.asin(1 / a) / (2 * Math.PI);
				}
	
				return - (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	
			},
	
			Out: function (k) {
	
				var s;
				var a = 0.1;
				var p = 0.4;
	
				if (k === 0) {
					return 0;
				}
	
				if (k === 1) {
					return 1;
				}
	
				if (!a || a < 1) {
					a = 1;
					s = p / 4;
				} else {
					s = p * Math.asin(1 / a) / (2 * Math.PI);
				}
	
				return (a * Math.pow(2, - 10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
	
			},
	
			InOut: function (k) {
	
				var s;
				var a = 0.1;
				var p = 0.4;
	
				if (k === 0) {
					return 0;
				}
	
				if (k === 1) {
					return 1;
				}
	
				if (!a || a < 1) {
					a = 1;
					s = p / 4;
				} else {
					s = p * Math.asin(1 / a) / (2 * Math.PI);
				}
	
				if ((k *= 2) < 1) {
					return - 0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
				}
	
				return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
	
			}
	
		},
	
		Back: {
	
			In: function (k) {
	
				var s = 1.70158;
	
				return k * k * ((s + 1) * k - s);
	
			},
	
			Out: function (k) {
	
				var s = 1.70158;
	
				return --k * k * ((s + 1) * k + s) + 1;
	
			},
	
			InOut: function (k) {
	
				var s = 1.70158 * 1.525;
	
				if ((k *= 2) < 1) {
					return 0.5 * (k * k * ((s + 1) * k - s));
				}
	
				return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
	
			}
	
		},
	
		Bounce: {
	
			In: function (k) {
	
				return 1 - TWEEN.Easing.Bounce.Out(1 - k);
	
			},
	
			Out: function (k) {
	
				if (k < (1 / 2.75)) {
					return 7.5625 * k * k;
				} else if (k < (2 / 2.75)) {
					return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
				} else if (k < (2.5 / 2.75)) {
					return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
				} else {
					return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
				}
	
			},
	
			InOut: function (k) {
	
				if (k < 0.5) {
					return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
				}
	
				return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
	
			}
	
		}
	
	};
	
	TWEEN.Interpolation = {
	
		Linear: function (v, k) {
	
			var m = v.length - 1;
			var f = m * k;
			var i = Math.floor(f);
			var fn = TWEEN.Interpolation.Utils.Linear;
	
			if (k < 0) {
				return fn(v[0], v[1], f);
			}
	
			if (k > 1) {
				return fn(v[m], v[m - 1], m - f);
			}
	
			return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
	
		},
	
		Bezier: function (v, k) {
	
			var b = 0;
			var n = v.length - 1;
			var pw = Math.pow;
			var bn = TWEEN.Interpolation.Utils.Bernstein;
	
			for (var i = 0; i <= n; i++) {
				b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
			}
	
			return b;
	
		},
	
		CatmullRom: function (v, k) {
	
			var m = v.length - 1;
			var f = m * k;
			var i = Math.floor(f);
			var fn = TWEEN.Interpolation.Utils.CatmullRom;
	
			if (v[0] === v[m]) {
	
				if (k < 0) {
					i = Math.floor(f = m * (1 + k));
				}
	
				return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
	
			} else {
	
				if (k < 0) {
					return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
				}
	
				if (k > 1) {
					return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
				}
	
				return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
	
			}
	
		},
	
		Utils: {
	
			Linear: function (p0, p1, t) {
	
				return (p1 - p0) * t + p0;
	
			},
	
			Bernstein: function (n, i) {
	
				var fc = TWEEN.Interpolation.Utils.Factorial;
	
				return fc(n) / fc(i) / fc(n - i);
	
			},
	
			Factorial: (function () {
	
				var a = [1];
	
				return function (n) {
	
					var s = 1;
	
					if (a[n]) {
						return a[n];
					}
	
					for (var i = n; i > 1; i--) {
						s *= i;
					}
	
					a[n] = s;
					return s;
	
				};
	
			})(),
	
			CatmullRom: function (p0, p1, p2, p3, t) {
	
				var v0 = (p2 - p0) * 0.5;
				var v1 = (p3 - p1) * 0.5;
				var t2 = t * t;
				var t3 = t * t2;
	
				return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
	
			}
	
		}
	
	};
	
	// UMD (Universal Module Definition)
	(function (root) {
	
		if (true) {
	
			// AMD
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return TWEEN;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
		} else if (typeof module !== 'undefined' && typeof exports === 'object') {
	
			// Node.js
			module.exports = TWEEN;
	
		} else if (root !== undefined) {
	
			// Global variable
			root.TWEEN = TWEEN;
	
		}
	
	})(this);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tween = __webpack_require__(3);
	
	var _tween2 = _interopRequireDefault(_tween);
	
	var _thumbnail = __webpack_require__(5);
	
	var _thumbnail2 = _interopRequireDefault(_thumbnail);
	
	var _previewer = __webpack_require__(6);
	
	var _previewer2 = _interopRequireDefault(_previewer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Section = function () {
	    function Section() {
	        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        var data = _ref.data;
	        var thumbnailWidth = _ref.thumbnailWidth;
	        var _ref$sectionTitleElem = _ref.sectionTitleElementName;
	        var sectionTitleElementName = _ref$sectionTitleElem === undefined ? 'h2' : _ref$sectionTitleElem;
	        var _ref$titleElementName = _ref.titleElementName;
	        var titleElementName = _ref$titleElementName === undefined ? 'h2' : _ref$titleElementName;
	        var onThumbnailCreated = _ref.onThumbnailCreated;
	        var onThumbnailCanExpand = _ref.onThumbnailCanExpand;
	        var onThumbnailWillExpand = _ref.onThumbnailWillExpand;
	        var onThumbnailDidExpand = _ref.onThumbnailDidExpand;
	        var onThumbnailCanCollapse = _ref.onThumbnailCanCollapse;
	        var onThumbnailWillCollapse = _ref.onThumbnailWillCollapse;
	        var onThumbnailDidCollapse = _ref.onThumbnailDidCollapse;
	        var _ref$scrollOffset = _ref.scrollOffset;
	        var scrollOffset = _ref$scrollOffset === undefined ? 20 : _ref$scrollOffset;
	
	        _classCallCheck(this, Section);
	
	        this._node = null;
	        this.data = data;
	        this._id = data.id;
	        this.thumbnailWidth = thumbnailWidth;
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
	
	    _createClass(Section, [{
	        key: 'init',
	        value: function init() {
	            if (_typeof(this.data) !== 'object') {
	                throw new Error('[Galleria] Unable to init section. Data must be of object type.');
	            }
	
	            this._node = document.createElement('div');
	            this._node.classList.add('galleria-section');
	
	            this.recreateThumbnails();
	        }
	    }, {
	        key: 'getId',
	        value: function getId() {
	            return this._id;
	        }
	    }, {
	        key: 'getNode',
	        value: function getNode() {
	            return this._node;
	        }
	    }, {
	        key: 'getPreviewer',
	        value: function getPreviewer() {
	            return this._previewer;
	        }
	    }, {
	        key: 'clearThumbnails',
	        value: function clearThumbnails() {
	            if (this._node) {
	                while (this._node.firstChild) {
	                    this._node.removeChild(this._node.firstChild);
	                }
	            }
	
	            this.thumbnails = [];
	        }
	    }, {
	        key: 'recreateThumbnails',
	        value: function recreateThumbnails() {
	            if (this._node) {
	                this.clearThumbnails();
	
	                var i = 0,
	                    thumbnail = null,
	                    data = null;
	
	                while (i < this.data.thumbnails.length) {
	                    if (_typeof(this.data.thumbnails[i]) === 'object') {
	                        data = Object.assign({}, this.data.thumbnails[i]);
	
	                        if (!data.id) {
	                            data.id = 'thumbnail_' + Date.now() + '_' + i;
	                        }
	
	                        thumbnail = new _thumbnail2.default({
	                            data: data,
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
	    }, {
	        key: 'addPreviewer',
	        value: function addPreviewer(thumbnail) {
	            if (!this._previewer && thumbnail && thumbnail.getNode().parentNode) {
	                this._previewer = new _previewer2.default({
	                    onOpened: this._onPreviewerOpened.bind(this),
	                    onClosed: this._onPreviewerClosed.bind(this)
	                });
	
	                if (thumbnail.getNode().nextSibling) {
	                    thumbnail.getNode().parentNode.insertBefore(this._previewer.getNode(), thumbnail.getNode().nextSibling);
	                } else {
	                    thumbnail.getNode().parentNode.appendChild(this._previewer.getNode());
	                }
	
	                this._previewer.open();
	            }
	        }
	    }, {
	        key: 'removePreviewer',
	        value: function removePreviewer() {
	            if (this._previewer) {
	                if (this._previewer.getNode() && this._previewer.getNode().parentNode) {
	                    this._previewer.getNode().parentNode.removeChild(this._previewer.getNode());
	                }
	
	                this._previewer = null;
	            }
	        }
	    }, {
	        key: 'collapseThumbnail',
	        value: function collapseThumbnail() {
	            if (this._expandedThumbnail) {
	                this._expandedThumbnail.toggleExpand();
	                this.removePreviewer();
	                this._expandedThumbnail = null;
	            }
	        }
	    }, {
	        key: '_onThumbnailCanExpand',
	        value: function _onThumbnailCanExpand(thumbnail) {
	            var _this = this;
	
	            var proceed = true;
	
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
	                var pos = this._getPositionInPage(this._expandedThumbnail.getNode());
	                var coords = { x: window.scrollX, y: window.scrollY },
	                    tween = new _tween2.default.Tween(coords).to({ x: 0, y: pos.y - this.scrollOffset }, 300).onUpdate(function () {
	                    window.scrollTo(this.x, this.y);
	                }).onComplete(function (_) {
	                    if (typeof _this.onThumbnailDidExpand === 'function') {
	                        _this.onThumbnailDidExpand(_this, thumbnail.data, thumbnail.getNode(), _this._previewer);
	                    }
	                }).start();
	            }
	
	            return proceed;
	        }
	    }, {
	        key: '_onThumbnailCanCollapse',
	        value: function _onThumbnailCanCollapse(thumbnail) {
	            var proceed = true;
	
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
	    }, {
	        key: '_onPreviewerOpened',
	        value: function _onPreviewerOpened(previewer) {}
	    }, {
	        key: '_onPreviewerClosed',
	        value: function _onPreviewerClosed(previewer) {
	            console.log('closed');
	        }
	    }, {
	        key: '_getPositionInPage',
	        value: function _getPositionInPage(elem) {
	            var x = 0,
	                y = 0;
	
	            if (elem.offsetParent) {
	                do {
	                    x += elem.offsetLeft;
	                    y += elem.offsetTop;
	                } while (elem = elem.offsetParent);
	            }
	
	            return { x: x, y: y };
	        }
	    }]);
	
	    return Section;
	}();
	
	exports.default = Section;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Thumbnail = function () {
	    function Thumbnail() {
	        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        var data = _ref.data;
	        var _ref$thumbnailWidth = _ref.thumbnailWidth;
	        var thumbnailWidth = _ref$thumbnailWidth === undefined ? 175 : _ref$thumbnailWidth;
	        var onThumbnailCanExpand = _ref.onThumbnailCanExpand;
	        var onThumbnailCanCollapse = _ref.onThumbnailCanCollapse;
	
	        _classCallCheck(this, Thumbnail);
	
	        this.data = data;
	        this._id = this.data.id;
	        this.thumbnailWidth = thumbnailWidth;
	        this.onThumbnailCanExpand = onThumbnailCanExpand;
	        this.onThumbnailCanCollapse = onThumbnailCanCollapse;
	        this._expanded = false;
	
	        // setup nodes
	        this._node = document.createElement('div');
	        this._node.classList.add('galleria-thumbnail');
	        this._node.style.width = thumbnailWidth + 'px';
	        this._node.addEventListener('click', this._onClick.bind(this));
	        this._imgNode = document.createElement('img');
	        this._imgNode.addEventListener('load', this._onImageLoaded.bind(this));
	        this._node.appendChild(this._imgNode);
	    }
	
	    _createClass(Thumbnail, [{
	        key: 'init',
	        value: function init() {
	            if (_typeof(this.data) !== 'object') {
	                throw new Error('[Galleria] Unable to init thumbnail. Data must be of type object');
	            }
	
	            this._imgNode.src = this.data.src;
	        }
	    }, {
	        key: 'getId',
	        value: function getId() {
	            return this._id;
	        }
	    }, {
	        key: 'getNode',
	        value: function getNode() {
	            return this._node;
	        }
	    }, {
	        key: 'toggleExpand',
	        value: function toggleExpand() {
	            var proceed = true;
	            this._expanded = !this._expanded;
	
	            if (this._expanded) {
	                if (typeof this.onThumbnailCanExpand === 'function') {
	                    proceed = this.onThumbnailCanExpand(this);
	                }
	            } else {
	                if (typeof this.onThumbnailCanCollapse === 'function') {
	                    proceed = this.onThumbnailCanCollapse(this);
	                }
	            }
	
	            if (proceed) {
	                if (this._expanded) {
	                    this._node.classList.add('expanded');
	                } else {
	                    this._node.classList.remove('expanded');
	                }
	            }
	        }
	    }, {
	        key: '_onClick',
	        value: function _onClick(evt) {
	            this.toggleExpand();
	        }
	    }, {
	        key: '_onImageLoaded',
	        value: function _onImageLoaded(evt) {}
	    }]);
	
	    return Thumbnail;
	}();
	
	exports.default = Thumbnail;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Previewer = function () {
	    function Previewer() {
	        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        var onOpened = _ref.onOpened;
	        var onClosed = _ref.onClosed;
	
	        _classCallCheck(this, Previewer);
	
	        this.onOpened = onOpened;
	        this.onClosed = onClosed;
	        this._node = document.createElement('div');
	        this._node.classList.add('galleria-previewer');
	        this._transitionEndEvent = this._findTransitionEvent();
	        this._node.addEventListener(this._transitionEndEvent, this._onTransitionEnd.bind(this));
	        this._opened = false;
	    }
	
	    _createClass(Previewer, [{
	        key: 'getNode',
	        value: function getNode() {
	            return this._node;
	        }
	    }, {
	        key: 'open',
	        value: function open() {
	            var _this = this;
	
	            var delay = arguments.length <= 0 || arguments[0] === undefined ? 50 : arguments[0];
	
	            setTimeout(function (_) {
	                _this._node.style.height = '465px';
	            }, delay);
	        }
	    }, {
	        key: 'close',
	        value: function close() {
	            var delay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        }
	    }, {
	        key: '_findTransitionEvent',
	        value: function _findTransitionEvent() {
	            if (this._node) {
	                var t = void 0;
	                var transitions = {
	                    'transition': 'transitionend',
	                    'OTransition': 'oTransitionEnd',
	                    'MozTransition': 'transitionend',
	                    'WebkitTransition': 'webkitTransitionEnd'
	                };
	
	                for (t in transitions) {
	                    if (this._node.style[t] !== undefined) {
	                        return transitions[t];
	                    }
	                }
	            }
	
	            return null;
	        }
	    }, {
	        key: '_onTransitionEnd',
	        value: function _onTransitionEnd(event) {
	            if (event.propertyName === 'height') {
	                if (!this._opened) {
	                    this._opened = true;
	
	                    if (typeof this.onOpened === 'function') {
	                        this.onOpened(this);
	                    }
	                } else {
	                    if (typeof this.onClosed === 'function') {
	                        this.onClosed(this);
	                    }
	
	                    this._opened = false;
	                }
	            }
	        }
	    }]);
	
	    return Previewer;
	}();
	
	exports.default = Previewer;

/***/ }
/******/ ]);
//# sourceMappingURL=galleria.js.map