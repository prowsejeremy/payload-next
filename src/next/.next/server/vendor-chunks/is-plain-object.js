"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-plain-object";
exports.ids = ["vendor-chunks/is-plain-object"];
exports.modules = {

/***/ "(rsc)/./node_modules/is-plain-object/dist/is-plain-object.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/is-plain-object/dist/is-plain-object.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject)\n/* harmony export */ });\n/*!\n * is-plain-object <https://github.com/jonschlinkert/is-plain-object>\n *\n * Copyright (c) 2014-2017, Jon Schlinkert.\n * Released under the MIT License.\n */ function isObject(o) {\n    return Object.prototype.toString.call(o) === \"[object Object]\";\n}\nfunction isPlainObject(o) {\n    var ctor, prot;\n    if (isObject(o) === false) return false;\n    // If has modified constructor\n    ctor = o.constructor;\n    if (ctor === undefined) return true;\n    // If has modified prototype\n    prot = ctor.prototype;\n    if (isObject(prot) === false) return false;\n    // If constructor does not have an Object-specific method\n    if (prot.hasOwnProperty(\"isPrototypeOf\") === false) {\n        return false;\n    }\n    // Most likely a plain Object\n    return true;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaXMtcGxhaW4tb2JqZWN0L2Rpc3QvaXMtcGxhaW4tb2JqZWN0Lm1qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7O0NBS0MsR0FFRCxTQUFTQSxTQUFTQyxDQUFDO0lBQ2pCLE9BQU9DLE9BQU9DLFNBQVMsQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJLENBQUNKLE9BQU87QUFDL0M7QUFFQSxTQUFTSyxjQUFjTCxDQUFDO0lBQ3RCLElBQUlNLE1BQUtDO0lBRVQsSUFBSVIsU0FBU0MsT0FBTyxPQUFPLE9BQU87SUFFbEMsOEJBQThCO0lBQzlCTSxPQUFPTixFQUFFUSxXQUFXO0lBQ3BCLElBQUlGLFNBQVNHLFdBQVcsT0FBTztJQUUvQiw0QkFBNEI7SUFDNUJGLE9BQU9ELEtBQUtKLFNBQVM7SUFDckIsSUFBSUgsU0FBU1EsVUFBVSxPQUFPLE9BQU87SUFFckMseURBQXlEO0lBQ3pELElBQUlBLEtBQUtHLGNBQWMsQ0FBQyxxQkFBcUIsT0FBTztRQUNsRCxPQUFPO0lBQ1Q7SUFFQSw2QkFBNkI7SUFDN0IsT0FBTztBQUNUO0FBRXlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZG9ja2VyLXRlc3QtYXBwLy4vbm9kZV9tb2R1bGVzL2lzLXBsYWluLW9iamVjdC9kaXN0L2lzLXBsYWluLW9iamVjdC5tanM/NzhiZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIGlzLXBsYWluLW9iamVjdCA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvaXMtcGxhaW4tb2JqZWN0PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE3LCBKb24gU2NobGlua2VydC5cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG5mdW5jdGlvbiBpc09iamVjdChvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KG8pIHtcbiAgdmFyIGN0b3IscHJvdDtcblxuICBpZiAoaXNPYmplY3QobykgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgaGFzIG1vZGlmaWVkIGNvbnN0cnVjdG9yXG4gIGN0b3IgPSBvLmNvbnN0cnVjdG9yO1xuICBpZiAoY3RvciA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJ1ZTtcblxuICAvLyBJZiBoYXMgbW9kaWZpZWQgcHJvdG90eXBlXG4gIHByb3QgPSBjdG9yLnByb3RvdHlwZTtcbiAgaWYgKGlzT2JqZWN0KHByb3QpID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIGNvbnN0cnVjdG9yIGRvZXMgbm90IGhhdmUgYW4gT2JqZWN0LXNwZWNpZmljIG1ldGhvZFxuICBpZiAocHJvdC5oYXNPd25Qcm9wZXJ0eSgnaXNQcm90b3R5cGVPZicpID09PSBmYWxzZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIE1vc3QgbGlrZWx5IGEgcGxhaW4gT2JqZWN0XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgeyBpc1BsYWluT2JqZWN0IH07XG4iXSwibmFtZXMiOlsiaXNPYmplY3QiLCJvIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiaXNQbGFpbk9iamVjdCIsImN0b3IiLCJwcm90IiwiY29uc3RydWN0b3IiLCJ1bmRlZmluZWQiLCJoYXNPd25Qcm9wZXJ0eSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/is-plain-object/dist/is-plain-object.mjs\n");

/***/ })

};
;