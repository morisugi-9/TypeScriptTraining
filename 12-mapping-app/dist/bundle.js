/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module 'googlemaps'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\nconst form = document.querySelector(\"form\");\nconst addressInput = document.getElementById(\"address\");\nconst GOOGLE_API_KEY = \"\";\nfunction searchAddressHandler(event) {\n    event.preventDefault();\n    const enteredAddress = addressInput.value;\n    document.getElementById(\"map\").innerHTML = \"\";\n    const coordinates = { lat: 40.41, lng: -73.99 };\n    new ol.Map({\n        target: \"map\",\n        layers: [\n            new ol.layer.Tile({\n                source: new ol.source.OSM(),\n            }),\n        ],\n        view: new ol.View({\n            center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),\n            zoom: 16,\n        }),\n    });\n}\nform.addEventListener(\"submit\", searchAddressHandler);\n\n\n//# sourceURL=webpack://12-mapping-app/./src/app.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;