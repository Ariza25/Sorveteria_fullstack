"use strict";
// CreateOrderService.ts
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
exports.CreateOrderService = void 0;
const client_1 = require("@prisma/client");
class CreateOrderService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    execute(orderProps) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(orderProps.products)) {
                throw new Error("Products must be an array");
            }
            const orderData = Object.assign(Object.assign({}, orderProps), { FinalPrice: orderProps.FinalPrice, products: {
                    create: orderProps.products.map(product => ({
                        product: {
                            connect: {
                                id: product.productId
                            },
                        },
                        productName: product.productName,
                        quantityBought: product.quantityBought,
                        UnityPrice: product.UnityPrice,
                        UnitySubTotalPrice: product.UnitySubTotalPrice,
                    }))
                } });
            if (orderProps.cpf) {
                orderData.cpf = orderProps.cpf;
            }
            const order = yield this.prisma.order.create({
                data: orderData,
                include: {
                    products: true
                }
            });
            return order;
        });
    }
}
exports.CreateOrderService = CreateOrderService;
