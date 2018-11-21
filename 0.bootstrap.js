(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/game_of_life.js":
/*!******************************!*\
  !*** ../pkg/game_of_life.js ***!
  \******************************/
/*! exports provided: Cell, Universe, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cell\", function() { return Cell; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Universe\", function() { return Universe; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_of_life_bg */ \"../pkg/game_of_life_bg.wasm\");\n/* tslint:disable */\n\n\n/**\n*/\nconst Cell = Object.freeze({ Dead:0,Alive:1, });\n\nlet cachedTextDecoder = new TextDecoder('utf-8');\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory = new Uint8Array(_game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nlet cachedGlobalArgumentPtr = null;\nfunction globalArgumentPtr() {\n    if (cachedGlobalArgumentPtr === null) {\n        cachedGlobalArgumentPtr = _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_global_argument_ptr\"]();\n    }\n    return cachedGlobalArgumentPtr;\n}\n\nlet cachegetUint32Memory = null;\nfunction getUint32Memory() {\n    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint32Memory = new Uint32Array(_game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint32Memory;\n}\n\nfunction freeUniverse(ptr) {\n\n    _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_universe_free\"](ptr);\n}\n/**\n*/\nclass Universe {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Universe.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n        freeUniverse(ptr);\n    }\n\n    /**\n    * @param {number} arg0\n    * @param {number} arg1\n    * @returns {Universe}\n    */\n    static new(arg0, arg1) {\n        return Universe.__wrap(_game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_new\"](arg0, arg1));\n    }\n    /**\n    * @returns {number}\n    */\n    width() {\n        return _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_width\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    height() {\n        return _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_height\"](this.ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    cells() {\n        return _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_cells\"](this.ptr);\n    }\n    /**\n    * @param {number} arg0\n    * @param {number} arg1\n    * @returns {number}\n    */\n    index_of(arg0, arg1) {\n        return _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_index_of\"](this.ptr, arg0, arg1);\n    }\n    /**\n    * @returns {Universe}\n    */\n    tick() {\n        return Universe.__wrap(_game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_tick\"](this.ptr));\n    }\n    /**\n    * @returns {string}\n    */\n    render() {\n        const retptr = globalArgumentPtr();\n        _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_render\"](retptr, this.ptr);\n        const mem = getUint32Memory();\n        const rustptr = mem[retptr / 4];\n        const rustlen = mem[retptr / 4 + 1];\n\n        const realRet = getStringFromWasm(rustptr, rustlen).slice();\n        _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](rustptr, rustlen * 1);\n        return realRet;\n\n    }\n    /**\n    * @param {number} arg0\n    * @param {number} arg1\n    * @param {boolean} arg2\n    * @returns {void}\n    */\n    set_cell(arg0, arg1, arg2) {\n        return _game_of_life_bg__WEBPACK_IMPORTED_MODULE_0__[\"universe_set_cell\"](this.ptr, arg0, arg1, arg2);\n    }\n}\n\nfunction __wbindgen_throw(ptr, len) {\n    throw new Error(getStringFromWasm(ptr, len));\n}\n\n\n\n//# sourceURL=webpack:///../pkg/game_of_life.js?");

/***/ }),

/***/ "../pkg/game_of_life_bg.wasm":
/*!***********************************!*\
  !*** ../pkg/game_of_life_bg.wasm ***!
  \***********************************/
/*! exports provided: memory, __wbindgen_global_argument_ptr, __wbg_universe_free, universe_new, universe_width, universe_height, universe_cells, universe_index_of, universe_tick, universe_render, universe_set_cell, __wbindgen_free */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./game_of_life */ \"../pkg/game_of_life.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/game_of_life_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var game_of_life__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! game-of-life */ \"../pkg/game_of_life.js\");\n/* harmony import */ var game_of_life_game_of_life_bg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! game-of-life/game_of_life_bg */ \"../pkg/game_of_life_bg.wasm\");\n\n\n\nconst CELL_SIZE = 5; // px\nconst GRID_COLOR = \"#CCCCCC\";\nconst DEAD_COLOR = \"#FFFFFF\";\nconst ALIVE_COLOR = \"#000000\";\n\nclass Player {\n    constructor(width = 64, height = 64) {\n        this.width = width;\n        this.height = height;\n        this.universe = game_of_life__WEBPACK_IMPORTED_MODULE_0__[\"Universe\"].new(width, height);\n        this.playing = false;\n        this.tick_count = 0;\n\n        this.initialize_universe();\n    }\n\n    start() {\n        this.playing = true;\n    }\n\n    pause() {\n        this.playing = false;\n    }\n\n    toggleState() {\n        this.playing = !this.playing;\n    }\n\n    initialize_universe() {\n        for (var x = 0; x < this.width; x++) {\n            for (var y = 0; y < this.height; y++) {\n                const ix = x + y * this.height;\n                const alive = ix % 2 == 0 || ix % 7 == 0;\n                this.universe.set_cell(x, y, alive);\n            }\n        }\n    }\n\n    tick() {\n        if (this.playing) {\n            this.universe = this.universe.tick();\n            return true;\n        } else {\n            return false;\n        }\n    }\n\n    render(ctx) {\n        this.drawGrid(ctx);\n        this.drawCells(ctx);\n    }\n\n    drawGrid(ctx) {\n        ctx.beginPath();\n        ctx.strokeStyle = GRID_COLOR;\n\n        // Vertical lines.\n        for (let i = 0; i <= this.width; i++) {\n            ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);\n            ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * this.height + 1);\n        }\n\n        // Horizontal lines.\n        for (let j = 0; j <= this.height; j++) {\n            ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);\n            ctx.lineTo((CELL_SIZE + 1) * this.width + 1, j * (CELL_SIZE + 1) + 1);\n        }\n\n        ctx.stroke();\n    }\n\n    drawCells(ctx) {\n        const cellsPtr = this.universe.cells();\n        const cells = new Uint8Array(game_of_life_game_of_life_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer, cellsPtr, this.width * this.height);\n\n        ctx.beginPath();\n\n        for (let y = 0; y < this.height; y++) {\n            for (let x = 0; x < this.width; x++) {\n                const ix = this.universe.index_of(x, y);\n\n                ctx.fillStyle = cells[ix] === game_of_life__WEBPACK_IMPORTED_MODULE_0__[\"Cell\"].Dead\n                    ? DEAD_COLOR\n                    : ALIVE_COLOR;\n\n                ctx.fillRect(\n                    x * (CELL_SIZE + 1) + 1,\n                    y * (CELL_SIZE + 1) + 1,\n                    CELL_SIZE,\n                    CELL_SIZE\n                );\n            }\n        }\n\n        ctx.stroke();\n    }\n}\n\nconst player = new Player(128, 48);\nconst canvas = document.getElementById(\"game-of-life-canvas\");\ncanvas.height = (CELL_SIZE + 1) * player.height + 1;\ncanvas.width = (CELL_SIZE + 1) * player.width + 1;\n\nconst ctx = canvas.getContext(\"2d\");\n\nconst renderLoop = () => {\n    const changed = player.tick();\n    if (changed) {\n        player.render(ctx);\n        console.log(\"Rendered\");\n    }\n\n    requestAnimationFrame(renderLoop);\n};\n\n\ndocument.onmousedown = _ => player.start();\ndocument.onmouseup = _ => player.pause();\n\nplayer.render(ctx);\nrequestAnimationFrame(renderLoop);\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

}]);