"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(function (req, res, next) {
    console.log(`Received request: ${req.method} ${req.path}`);
    next();
});
app.use('/uploads', express_1.default.static(path_1.default.join('uploads')));
const port = 3333;
app.listen(port, () => {
    console.log(`Server started on ${port}!`);
});
exports.default = app;
