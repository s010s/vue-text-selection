(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vueSelection", [], factory);
	else if(typeof exports === 'object')
		exports["vueSelection"] = factory();
	else
		root["vueSelection"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var vueSelection = {
  bind: function bind(el, binding, vnode) {
    el.onmousedown = handleMouseDown;
    el.onmouseup = handleMouseUp;

    /**
     * handle mousedown event on el
     */
    function handleMouseDown() {
      el.onmouseup = null;
      document.body.onmouseup = handleBodyMouseUp;
    }
    /**
     * handle mouseup event on el
     */
    function handleMouseUp() {
      var selection = handleRange();
      selection.fixRangeStr && binding.value.getSelection && binding.value.getSelection(selection.fixRangeStr, selection.rangeStr);
    }
    /**
     * handle mouseup event on body
     */
    function handleBodyMouseUp() {
      var selection = handleRange();
      selection.fixRangeStr && binding.value.getSelection && binding.value.getSelection(selection.fixRangeStr, selection.rangeStr);
      if (!el.onmouseup) el.onmouseup = handleMouseUp;
      document.body.onmouseup = null;
    }
    /**
     * handle mousedown event on el
     */
    function handleRange() {
      var selection = window.getSelection();
      var rtn = {
        rangeStr: '',
        fixRangeStr: ''
      };
      if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        var region = document.createRange();
        region.selectNode(el);
        rtn.rangeStr = range.toString();
        if (binding.modifiers.fix) {
          fixRange(range, region);
          rtn.fixRangeStr = range.toString();
        } else {
          var copyRange = range.cloneRange();
          fixRange(copyRange, region);
          rtn.fixRangeStr = copyRange.toString();
          copyRange.detach();
        }
      }
      return rtn;
    }
    /**
     * fix the range according to the region
     * @param {*} range 
     * @param {*} region 
     */
    function fixRange(range, region) {
      if (range.compareBoundaryPoints(Range.START_TO_START, region) < 0) {
        range.setStart(region.startContainer, region.startOffset);
      }
      if (range.compareBoundaryPoints(Range.END_TO_END, region) > 0) {
        range.setEnd(region.endContainer, region.endOffset);
      }
    }
  }
};

exports.default = vueSelection;

/***/ })
/******/ ]);
});