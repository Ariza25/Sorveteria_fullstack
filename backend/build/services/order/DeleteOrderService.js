"use strict";
// DeleteOrderService.ts
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
exports.DeleteOrderService = void 0;
const client_1 = require("@prisma/client");
class DeleteOrderService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    execute(orderId, productIds) {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete all associated OrderProduct first
            for (const productId of productIds) {
                const product = yield this.prisma.product.findUnique({
                    where: { id: productId },
                });
                if (!product) {
                    throw new Error(`Product with ID ${productId} does not exist.`);
                }
                // Delete the OrderProduct relation
                yield this.prisma.orderProduct.deleteMany({
                    where: {
                        productId: productId,
                        orderId: orderId
                    }
                });
            }
            // Then delete the order
            const order = yield this.prisma.order.delete({
                where: {
                    id: orderId
                }
            });
            return order;
        });
    }
}
exports.DeleteOrderService = DeleteOrderService;
