(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("selection", [], factory);
	else if(typeof exports === 'object')
		exports["selection"] = factory();
	else
		root["selection"] = factory();
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
    document.body.addEventListener('mouseup', handleMouseUp);

    /**
     * handle mouseup event on body
     */
    function handleMouseUp() {
      if (!el.parentElement) {
        document.body.removeEventListener('mouseup', handleMouseUp);
        return;
      }
      var rtn = handleRange();
      rtn.fixStr && binding.value.getSelection && binding.value.getSelection(rtn.fixStr, rtn.allStr);
    }
    /**
     * handle range fix
     */
    function handleRange() {
      var selection = window.getSelection();
      var rtn = {
        allStr: '',
        fixStr: ''
      };
      if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        var region = document.createRange();
        region.selectNode(el);
        if (CheckIntersection(range, region)) {
          rtn.allStr = range.toString();
          if (binding.modifiers.fix) {
            fixRange(range, region);
            rtn.fixStr = range.toString();
          } else {
            var copyRange = range.cloneRange();
            fixRange(copyRange, region);
            rtn.fixStr = copyRange.toString();
            copyRange.detach();
          }
        }
      }
      return rtn;
    }
    /**
     * check if the range intersects the region
     * @param {*} range 
     * @param {*} region 
     */
    function CheckIntersection(range, region) {
      return !(range.compareBoundaryPoints(Range.END_TO_START, region) > 0 || range.compareBoundaryPoints(Range.START_TO_END, region) < 0);
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