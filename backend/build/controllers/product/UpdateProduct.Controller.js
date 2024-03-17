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
exports.UpdateProductController = void 0;
const UpdateProductService_1 = require("../../services/product/UpdateProductService");
class UpdateProductController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let { name, price, description, categoryId, quantity, sizeId, stock, images } = req.body;
                if (stock !== undefined)
                    stock = stock === 'true';
                if (quantity !== undefined)
                    quantity = Number(quantity);
                const data = {};
                if (name !== undefined)
                    data.name = name;
                if (price !== undefined)
                    data.price = price;
                if (description !== undefined)
                    data.description = description;
                if (categoryId !== undefined)
                    data.categoryId = categoryId;
                if (quantity !== undefined)
                    data.quantity = quantity;
                if (sizeId !== undefined)
                    data.sizeId = sizeId;
                if (stock !== undefined)
                    data.stock = stock;
                if (images !== undefined)
                    data.images = images;
                const updateProductService = new UpdateProductService_1.UpdateProductService();
                const product = yield updateProductService.execute(id, data);
                return res.status(200).json(product);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).json({ error: err.message });
                }
            }
        });
    }
}
exports.UpdateProductController = UpdateProductController;
