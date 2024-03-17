"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const CreateProductService_1 = require("../../services/product/CreateProductService");
class CreateProductController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, quantity, description, categoryId, sizeId, stock } = req.body;
                if (!req.files || req.files.length === 0) {
                    return res.status(400).json({ message: "No files included in request" });
                }
                const images = req.files.map(file => file.path);
                console.log('Image paths:', images);
                if (!categoryId) {
                    return res.status(400).json({ message: "Category ID is required" });
                }
                if (quantity !== undefined && quantity !== null && isNaN(quantity)) {
                    return res.status(400).json({ message: "Quantity must be a number" });
                }
                if (stock !== 'true' && stock !== 'false') {
                    return res.status(400).json({ message: "Stock must be a boolean" });
                }
                const quantityNumber = parseInt(quantity, 10);
                const stockBoolean = stock === 'true';
                const createProductService = new CreateProductService_1.CreateProductService();
                const product = yield createProductService.execute({ name, price, quantity: quantityNumber, description, categoryId, sizeId, stock: stockBoolean, images });
                return res.status(200).json({ message: "Product created successfully", product });
            }
            catch (err) {
                return res.status(500).json(err.message);
            }
        });
    }
}
exports.CreateProductController = CreateProductController;
