(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("B", [], factory);
	else if(typeof exports === 'object')
		exports["B"] = factory();
	else
		root["B"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/B/math/activationfunction.js":
/*!******************************************!*\
  !*** ./src/B/math/activationfunction.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ActivationFunction = function () {\n    function ActivationFunction(v) {\n        _classCallCheck(this, ActivationFunction);\n\n        this.value = v;\n    }\n\n    _createClass(ActivationFunction, null, [{\n        key: \"types\",\n        value: function types() {\n            return {\n                STEP: 0,\n                LINEAR: 1,\n                SIGMOID: 2,\n                HYPERTAN: 3\n            };\n        }\n    }]);\n\n    return ActivationFunction;\n}();\n\nexports.default = ActivationFunction;\n\n//# sourceURL=webpack://B/./src/B/math/activationfunction.js?");

/***/ }),

/***/ "./src/B/math/hypertan.js":
/*!********************************!*\
  !*** ./src/B/math/hypertan.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _activationfunction = __webpack_require__(/*! ./activationfunction */ \"./src/B/math/activationfunction.js\");\n\nvar _activationfunction2 = _interopRequireDefault(_activationfunction);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Hypertan = function (_ActivationFunction) {\n    _inherits(Hypertan, _ActivationFunction);\n\n    function Hypertan(v) {\n        _classCallCheck(this, Hypertan);\n\n        return _possibleConstructorReturn(this, (Hypertan.__proto__ || Object.getPrototypeOf(Hypertan)).call(this, v));\n    }\n\n    _createClass(Hypertan, [{\n        key: 'calc',\n        value: function calc(x) {\n            if (!isNaN(x)) {\n                return (1.0 - Math.exp(-this.value * x)) / (1.0 + Math.exp(-this.value * x));\n            }\n\n            return this.value;\n        }\n    }, {\n        key: 'derivative',\n        value: function derivative(x) {\n            return 1.0 - Math.pow(this.calc(x), 2.0);\n        }\n    }]);\n\n    return Hypertan;\n}(_activationfunction2.default);\n\nexports.default = Hypertan;\n\n//# sourceURL=webpack://B/./src/B/math/hypertan.js?");

/***/ }),

/***/ "./src/B/math/linear.js":
/*!******************************!*\
  !*** ./src/B/math/linear.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _activationfunction = __webpack_require__(/*! ./activationfunction */ \"./src/B/math/activationfunction.js\");\n\nvar _activationfunction2 = _interopRequireDefault(_activationfunction);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Linear = function (_ActivationFunction) {\n    _inherits(Linear, _ActivationFunction);\n\n    function Linear(v) {\n        _classCallCheck(this, Linear);\n\n        return _possibleConstructorReturn(this, (Linear.__proto__ || Object.getPrototypeOf(Linear)).call(this, v));\n    }\n\n    _createClass(Linear, [{\n        key: \"calc\",\n        value: function calc(x) {\n            if (!isNaN(x)) {\n                return this.value * x;\n            }\n            return this.value;\n        }\n    }, {\n        key: \"derivative\",\n        value: function derivative(x) {\n            return this.value;\n        }\n    }]);\n\n    return Linear;\n}(_activationfunction2.default);\n\nexports.default = Linear;\n\n//# sourceURL=webpack://B/./src/B/math/linear.js?");

/***/ }),

/***/ "./src/B/math/sigmoid.js":
/*!*******************************!*\
  !*** ./src/B/math/sigmoid.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _activationfunction = __webpack_require__(/*! ./activationfunction */ \"./src/B/math/activationfunction.js\");\n\nvar _activationfunction2 = _interopRequireDefault(_activationfunction);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Sigmoid = function (_ActivationFunction) {\n    _inherits(Sigmoid, _ActivationFunction);\n\n    function Sigmoid(v) {\n        _classCallCheck(this, Sigmoid);\n\n        return _possibleConstructorReturn(this, (Sigmoid.__proto__ || Object.getPrototypeOf(Sigmoid)).call(this, v));\n    }\n\n    _createClass(Sigmoid, [{\n        key: \"calc\",\n        value: function calc(x) {\n            if (!isNaN(x)) {\n                return 1.0 / (1.0 + Math.exp(-this.value * x));\n            }\n            return 1;\n        }\n    }, {\n        key: \"derivative\",\n        value: function derivative(x) {\n            return this.calc(x) * (1 - this.calc(x));\n        }\n    }]);\n\n    return Sigmoid;\n}(_activationfunction2.default);\n\nexports.default = Sigmoid;\n\n//# sourceURL=webpack://B/./src/B/math/sigmoid.js?");

/***/ }),

/***/ "./src/B/net/hiddenlayer.js":
/*!**********************************!*\
  !*** ./src/B/net/hiddenlayer.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _layer = __webpack_require__(/*! ./layer */ \"./src/B/net/layer.js\");\n\nvar _layer2 = _interopRequireDefault(_layer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar HiddenLayer = function (_Layer) {\n    _inherits(HiddenLayer, _Layer);\n\n    function HiddenLayer(numOfInputs, numOfNeurons, activationFnc) {\n        _classCallCheck(this, HiddenLayer);\n\n        return _possibleConstructorReturn(this, (HiddenLayer.__proto__ || Object.getPrototypeOf(HiddenLayer)).call(this, numOfInputs, numOfNeurons, activationFnc));\n    }\n\n    return HiddenLayer;\n}(_layer2.default);\n\nexports.default = HiddenLayer;\n\n//# sourceURL=webpack://B/./src/B/net/hiddenlayer.js?");

/***/ }),

/***/ "./src/B/net/inputlayer.js":
/*!*********************************!*\
  !*** ./src/B/net/inputlayer.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _layer = __webpack_require__(/*! ./layer */ \"./src/B/net/layer.js\");\n\nvar _layer2 = _interopRequireDefault(_layer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar InputLayer = function (_Layer) {\n    _inherits(InputLayer, _Layer);\n\n    function InputLayer(numOfInputs) {\n        _classCallCheck(this, InputLayer);\n\n        return _possibleConstructorReturn(this, (InputLayer.__proto__ || Object.getPrototypeOf(InputLayer)).call(this, numOfInputs, numOfInputs));\n    }\n\n    return InputLayer;\n}(_layer2.default);\n\nexports.default = InputLayer;\n\n//# sourceURL=webpack://B/./src/B/net/inputlayer.js?");

/***/ }),

/***/ "./src/B/net/layer.js":
/*!****************************!*\
  !*** ./src/B/net/layer.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _neuron = __webpack_require__(/*! ./neuron */ \"./src/B/net/neuron.js\");\n\nvar _neuron2 = _interopRequireDefault(_neuron);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Layer = function () {\n    function Layer(numOfInputs) {\n        var numOfNeurons = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n        var activationFnc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { calc: function calc(f) {\n                return f;\n            } };\n\n        _classCallCheck(this, Layer);\n\n        this.numOfNeurons = numOfNeurons;\n        this.neurons = new Array(this.numOfNeurons);\n\n        this.numOfInputs = numOfInputs;\n        this.inputs = new Array(this.numOfInputs);\n\n        this.activationFnc = activationFnc;\n\n        this.outputs = new Array(this.numOfNeurons);\n\n        this.prev = undefined; // previous layer\n        this.next = undefined; // next layer\n    }\n\n    _createClass(Layer, [{\n        key: 'init',\n        value: function init() {\n            for (var i = 0; i < this.numOfNeurons; i++) {\n                this.neurons[i] = new _neuron2.default(this.numOfInputs, this.activationFnc);\n                this.neurons[i].init();\n            }\n        }\n    }, {\n        key: 'calc',\n        value: function calc() {\n            for (var i = 0; i < this.numOfNeurons; i++) {\n\n                var neuron = this.neurons[i];\n\n                neuron.inputs = this.inputs;\n                neuron.calc();\n\n                this.outputs[i] = neuron.output;\n            }\n        }\n    }]);\n\n    return Layer;\n}();\n\nexports.default = Layer;\n\n//# sourceURL=webpack://B/./src/B/net/layer.js?");

/***/ }),

/***/ "./src/B/net/net.js":
/*!**************************!*\
  !*** ./src/B/net/net.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _inputlayer = __webpack_require__(/*! ./inputlayer */ \"./src/B/net/inputlayer.js\");\n\nvar _inputlayer2 = _interopRequireDefault(_inputlayer);\n\nvar _hiddenlayer = __webpack_require__(/*! ./hiddenlayer */ \"./src/B/net/hiddenlayer.js\");\n\nvar _hiddenlayer2 = _interopRequireDefault(_hiddenlayer);\n\nvar _outputlayer = __webpack_require__(/*! ./outputlayer */ \"./src/B/net/outputlayer.js\");\n\nvar _outputlayer2 = _interopRequireDefault(_outputlayer);\n\nvar _sigmoid = __webpack_require__(/*! ../math/sigmoid */ \"./src/B/math/sigmoid.js\");\n\nvar _sigmoid2 = _interopRequireDefault(_sigmoid);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Net = function () {\n    function Net(numOfInputs, numOfOutputs) {\n        var hiddenLayers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];\n        var hiddenActivationFnc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];\n        var outputActivationFnc = arguments[4];\n\n        _classCallCheck(this, Net);\n\n        this.numOfInputs = numOfInputs;\n        this.numOfOutputs = numOfOutputs;\n\n        this.numOfHiddenLayers = hiddenLayers.length;\n        this.hiddenActivationFnc = hiddenActivationFnc;\n\n        this.hiddenLayers = [];\n        this.inputLayer = new _inputlayer2.default(this.numOfInputs);\n        this.inputLayer.init();\n\n        this.inputs = new Array(this.numOfInputs);\n        this.outputs = new Array(this.numOfOutputs);\n\n        this.outputAcFnc = outputActivationFnc;\n\n        this.hiddenLayers = this.createHiddenLayers(hiddenLayers);\n        this.outputLayer = this.createOutputLayer();\n    }\n\n    _createClass(Net, [{\n        key: 'createHiddenLayers',\n        value: function createHiddenLayers(hiddenLayers) {\n            var layers = [];\n\n            var ref = this.inputLayer;\n\n            for (var i = 0; i < hiddenLayers.length; i++) {\n\n                var hidden = new _hiddenlayer2.default(ref.numOfNeurons, hiddenLayers[i], this.hiddenActivationFnc[i]);\n                ref.next = hidden;\n                hidden.prev = ref;\n                layers.push(hidden);\n\n                hidden.init();\n                ref = hidden;\n            }\n\n            return layers;\n        }\n    }, {\n        key: 'createOutputLayer',\n        value: function createOutputLayer() {\n            var outputLayer = void 0;\n\n            if (this.numOfHiddenLayers > 0) {\n\n                var inputs = this.hiddenLayers[this.numOfHiddenLayers - 1].numOfNeurons;\n\n                outputLayer = new _outputlayer2.default(inputs, this.numOfOutputs, this.outputAcFnc);\n                outputLayer.prev = this.hiddenLayers[this.numOfHiddenLayers - 1];\n                this.hiddenLayers[this.numOfHiddenLayers - 1].next = outputLayer;\n            } else {\n                outputLayer = new _outputlayer2.default(this.numOfInputs, this.numOfOutputs, this.outputAcFnc);\n\n                this.inputLayer.next = outputLayer;\n                outputLayer.prev = this.inputLayer;\n            }\n            outputLayer.init();\n            return outputLayer;\n        }\n    }, {\n        key: 'calc',\n        value: function calc() {\n            this.inputLayer.inputs = this.inputs;\n            this.inputLayer.calc();\n\n            for (var i = 0; i < this.numOfHiddenLayers; i++) {\n                var layer = this.hiddenLayers[i];\n\n                layer.inputs = layer.prev.outputs;\n                layer.calc();\n            }\n\n            this.outputLayer.inputs = this.outputLayer.prev.outputs;\n            this.outputLayer.calc();\n            this.outputs = this.outputLayer.outputs;\n        }\n    }]);\n\n    return Net;\n}();\n\nexports.default = Net;\n\n//# sourceURL=webpack://B/./src/B/net/net.js?");

/***/ }),

/***/ "./src/B/net/neuron.js":
/*!*****************************!*\
  !*** ./src/B/net/neuron.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Neuron = function () {\n    function Neuron(numOfInputs, activationFunction) {\n        _classCallCheck(this, Neuron);\n\n        this.output = undefined;\n        this.outputBeforeActivation = undefined;\n\n        this.numOfInputs = numOfInputs;\n        this.weights = new Array(this.numOfInputs);\n        this.inputs = new Array(this.numOfInputs);\n        this.bias = 2.0;\n        this.activationFunction = activationFunction;\n    }\n\n    _createClass(Neuron, [{\n        key: \"init\",\n        value: function init() {\n            for (var i = 0; i <= this.numOfInputs; i++) {\n\n                var newWeight = Math.random();\n                this.weights[i] = newWeight;\n            }\n        }\n    }, {\n        key: \"calc\",\n        value: function calc() {\n            var outputBeforeActivation = 0.0;\n\n            if (this.numOfInputs > 0 && this.inputs.length && this.weights.length) {\n\n                for (var i = 0; i <= this.numOfInputs; i++) {\n                    outputBeforeActivation += (i === this.numOfInputs ? this.bias : this.inputs[i]) * this.weights[i];\n                }\n            }\n            this.outputBeforeActivation = outputBeforeActivation;\n            this.output = this.activationFunction.calc(this.outputBeforeActivation);\n        }\n    }]);\n\n    return Neuron;\n}();\n\nexports.default = Neuron;\n\n//# sourceURL=webpack://B/./src/B/net/neuron.js?");

/***/ }),

/***/ "./src/B/net/outputlayer.js":
/*!**********************************!*\
  !*** ./src/B/net/outputlayer.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _layer = __webpack_require__(/*! ./layer */ \"./src/B/net/layer.js\");\n\nvar _layer2 = _interopRequireDefault(_layer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar OutputLayer = function (_Layer) {\n    _inherits(OutputLayer, _Layer);\n\n    function OutputLayer(numOfInputs, numOfNeurons, activationFnc) {\n        _classCallCheck(this, OutputLayer);\n\n        return _possibleConstructorReturn(this, (OutputLayer.__proto__ || Object.getPrototypeOf(OutputLayer)).call(this, numOfInputs, numOfNeurons, activationFnc));\n    }\n\n    return OutputLayer;\n}(_layer2.default);\n\nexports.default = OutputLayer;\n\n//# sourceURL=webpack://B/./src/B/net/outputlayer.js?");

/***/ }),

/***/ "./src/B/training/deltarule.js":
/*!*************************************!*\
  !*** ./src/B/training/deltarule.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _trainer = __webpack_require__(/*! ./trainer */ \"./src/B/training/trainer.js\");\n\nvar _trainer2 = _interopRequireDefault(_trainer);\n\nvar _errorMeasurement = __webpack_require__(/*! ./errorMeasurement */ \"./src/B/training/errorMeasurement.js\");\n\nvar _errorMeasurement2 = _interopRequireDefault(_errorMeasurement);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar DeltaRule = function (_PT) {\n    _inherits(DeltaRule, _PT);\n\n    // error [[]] è una matrice\n    function DeltaRule(error, generalError, overallError, overallGeneralError) {\n        _classCallCheck(this, DeltaRule);\n\n        return _possibleConstructorReturn(this, (DeltaRule.__proto__ || Object.getPrototypeOf(DeltaRule)).call(this));\n        /*\n        this.degrees = {\n            generalError: 0.0,\n            overallError: 2.0\n        };\n         this.error = error;\n        this.generalError = [];\n        this.overallError = [];\n        this.overallGeneralError = overallGeneralError;\n         this.measurements = {\n            generalError: ErrorMeasurement.SQUARE_ERROR,\n            overallError: ErrorMeasurement.MSE\n        };\n         this.currentRecord = 0;\n        this.newWeights = []; // new weights is a matrix of a matric ( every neuron has a list of weights)\n        */\n    }\n\n    return DeltaRule;\n}(_trainer2.default);\n\nexports.default = DeltaRule;\n\n//# sourceURL=webpack://B/./src/B/training/deltarule.js?");

/***/ }),

/***/ "./src/B/training/errorMeasurement.js":
/*!********************************************!*\
  !*** ./src/B/training/errorMeasurement.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = {\n    SIMPLE_ERROR: 0,\n    SQUARE_ERROR: 1,\n    N_DEGREE_ERROR: 2,\n    MSE: 3\n};\n\n//# sourceURL=webpack://B/./src/B/training/errorMeasurement.js?");

/***/ }),

/***/ "./src/B/training/trainer.js":
/*!***********************************!*\
  !*** ./src/B/training/trainer.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar PT = function () {\n    _createClass(PT, null, [{\n        key: \"LearningMode\",\n        value: function LearningMode() {\n            return {\n                ONLINE: 0,\n                BATCH: 1\n            };\n        }\n    }, {\n        key: \"LearningParadigm\",\n        value: function LearningParadigm() {\n            return {\n                SUPERVISED: 0,\n                UNSUPERVISED: 1\n            };\n        }\n    }]);\n\n    function PT(net, trainingDataSet, testingDataSet, validatingDataSet) {\n        _classCallCheck(this, PT);\n\n        this.net = net;\n\n        this.maxEpochs = 100;\n        this.epoch = 0;\n        this.minOverallError = 0.001;\n\n        this.learningRate = 0.1;\n        this.datasets = {\n            training: trainingDataSet,\n            testing: testingDataSet,\n            validating: validatingDataSet\n        };\n\n        this.printTraining = false;\n    }\n\n    _createClass(PT, [{\n        key: \"train\",\n        value: function train() {}\n    }, {\n        key: \"forward\",\n        value: function forward(step) {}\n    }, {\n        key: \"calcWeights\",\n        value: function calcWeights(layer, input, neuron) {\n            var error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;\n        }\n    }]);\n\n    return PT;\n}();\n\nexports.default = PT;\n\n//# sourceURL=webpack://B/./src/B/training/trainer.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.PT = exports.ErrorMeasurement = exports.DeltaRule = exports.Hyperthan = exports.Linear = exports.Sigmoid = exports.ActivationFunction = exports.Net = exports.OutputLayer = exports.HiddenLayer = exports.InputLayer = exports.Layer = exports.Neuron = undefined;\n\nvar _neuron = __webpack_require__(/*! ./B/net/neuron */ \"./src/B/net/neuron.js\");\n\nvar _neuron2 = _interopRequireDefault(_neuron);\n\nvar _layer = __webpack_require__(/*! ./B/net/layer */ \"./src/B/net/layer.js\");\n\nvar _layer2 = _interopRequireDefault(_layer);\n\nvar _inputlayer = __webpack_require__(/*! ./B/net/inputlayer */ \"./src/B/net/inputlayer.js\");\n\nvar _inputlayer2 = _interopRequireDefault(_inputlayer);\n\nvar _outputlayer = __webpack_require__(/*! ./B/net/outputlayer */ \"./src/B/net/outputlayer.js\");\n\nvar _outputlayer2 = _interopRequireDefault(_outputlayer);\n\nvar _hiddenlayer = __webpack_require__(/*! ./B/net/hiddenlayer */ \"./src/B/net/hiddenlayer.js\");\n\nvar _hiddenlayer2 = _interopRequireDefault(_hiddenlayer);\n\nvar _net = __webpack_require__(/*! ./B/net/net */ \"./src/B/net/net.js\");\n\nvar _net2 = _interopRequireDefault(_net);\n\nvar _activationfunction = __webpack_require__(/*! ./B/math/activationfunction */ \"./src/B/math/activationfunction.js\");\n\nvar _activationfunction2 = _interopRequireDefault(_activationfunction);\n\nvar _sigmoid = __webpack_require__(/*! ./B/math/sigmoid */ \"./src/B/math/sigmoid.js\");\n\nvar _sigmoid2 = _interopRequireDefault(_sigmoid);\n\nvar _linear = __webpack_require__(/*! ./B/math/linear */ \"./src/B/math/linear.js\");\n\nvar _linear2 = _interopRequireDefault(_linear);\n\nvar _hypertan = __webpack_require__(/*! ./B/math/hypertan */ \"./src/B/math/hypertan.js\");\n\nvar _hypertan2 = _interopRequireDefault(_hypertan);\n\nvar _deltarule = __webpack_require__(/*! ./B/training/deltarule */ \"./src/B/training/deltarule.js\");\n\nvar _deltarule2 = _interopRequireDefault(_deltarule);\n\nvar _errorMeasurement = __webpack_require__(/*! ./B/training/errorMeasurement */ \"./src/B/training/errorMeasurement.js\");\n\nvar _errorMeasurement2 = _interopRequireDefault(_errorMeasurement);\n\nvar _trainer = __webpack_require__(/*! ./B/training/trainer */ \"./src/B/training/trainer.js\");\n\nvar _trainer2 = _interopRequireDefault(_trainer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.Neuron = _neuron2.default;\nexports.Layer = _layer2.default;\nexports.InputLayer = _inputlayer2.default;\nexports.HiddenLayer = _hiddenlayer2.default;\nexports.OutputLayer = _outputlayer2.default;\nexports.Net = _net2.default;\nexports.ActivationFunction = _activationfunction2.default;\nexports.Sigmoid = _sigmoid2.default;\nexports.Linear = _linear2.default;\nexports.Hyperthan = _hypertan2.default;\nexports.DeltaRule = _deltarule2.default;\nexports.ErrorMeasurement = _errorMeasurement2.default;\nexports.PT = _trainer2.default;\n\n//# sourceURL=webpack://B/./src/index.js?");

/***/ })

/******/ });
});