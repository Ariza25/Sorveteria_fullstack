"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const DeleteCategoryController_1 = require("./controllers/category/DeleteCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListProductController_1 = require("./controllers/product/ListProductController");
const DeleteProductController_1 = require("./controllers/product/DeleteProductController");
const UpdateProduct_Controller_1 = require("./controllers/product/UpdateProduct.Controller");
const ListUserController_1 = require("./controllers/user/ListUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const CreateSizeController_1 = require("./controllers/size/CreateSizeController");
const ListSizeController_1 = require("./controllers/size/ListSizeController");
const DeleteSizeController_1 = require("./controllers/size/DeleteSizeController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const ListOrdersController_1 = require("./controllers/order/ListOrdersController");
const DeleteOrderController_1 = require("./controllers/order/DeleteOrderController");
const UpdateOrderController_1 = require("./controllers/order/UpdateOrderController");
const UpdateCategoryController_1 = require("./controllers/category/UpdateCategoryController");
const UpdateSizeController_1 = require("./controllers/size/UpdateSizeController");
const CreateContactController_1 = require("./controllers/contact/CreateContactController");
const ListContactController_1 = require("./controllers/contact/ListContactController");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello World" });
});
router.post('/v1/api/product', upload.array('images'), (req, res) => {
    return new CreateProductController_1.CreateProductController().handle(req, res);
});
router.get("/v1/api/products", (req, res) => {
    return new ListProductController_1.ListProductController().handle(req, res);
});
router.put("/v1/api/product/:id", upload.array('images'), (req, res) => {
    return new UpdateProduct_Controller_1.UpdateProductController().handle(req, res);
});
router.delete("/v1/api/product/:id", (req, res) => {
    return new DeleteProductController_1.DeleteProductController().handle(req, res);
});
router.post("/v1/api/category", (req, res) => {
    return new CreateCategoryController_1.CreateCategoryController().handle(req, res);
});
router.get("/v1/api/categories", (req, res) => {
    return new ListCategoryController_1.ListCategoryController().handle(req, res);
});
router.put("/v1/api/category/:id", (req, res) => {
    return new UpdateCategoryController_1.UpdateCategoryController().handle(req, res);
});
router.delete("/v1/api/category/:id", (req, res) => {
    return new DeleteCategoryController_1.DeleteCategoryController().handle(req, res);
});
router.post('/v1/api/register', (req, res) => {
    return new CreateUserController_1.CreateUserController().handle(req, res);
});
router.get('/v1/api/users', (req, res) => {
    return new ListUserController_1.ListUserController().handle(req, res);
});
router.post('/v1/api/login', (req, res) => {
    return new AuthUserController_1.AuthUserController().handle(req, res);
});
router.post('/v1/api/size', (req, res) => {
    return new CreateSizeController_1.CreateSizeController().handle(req, res);
});
router.get('/v1/api/sizes', (req, res) => {
    return new ListSizeController_1.ListSizeController().handle(req, res);
});
router.put("/v1/api/size/:id", (req, res) => {
    return new UpdateSizeController_1.UpdateSizeController().handle(req, res);
});
router.delete('/v1/api/size/:id', (req, res) => {
    return new DeleteSizeController_1.DeleteSizeController().handle(req, res);
});
router.post('/v1/api/order', (req, res) => {
    return new CreateOrderController_1.CreateOrderController().handle(req, res);
});
router.put('/v1/api/order/', (req, res) => {
    return new UpdateOrderController_1.UpdateOrderController().handle(req, res);
});
router.get('/v1/api/orders', (req, res) => {
    return new ListOrdersController_1.ListOrdersController().handle(req, res);
});
router.delete('/v1/api/order/:orderId', (req, res) => {
    return new DeleteOrderController_1.DeleteOrderController().handle(req, res);
});
router.post('/v1/api/contact', (req, res) => {
    return new CreateContactController_1.CreateContactController().handle(req, res);
});
router.get('/v1/api/contacts', (req, res) => {
    return new ListContactController_1.ListContactController().handle(req, res);
});
exports.default = router;
