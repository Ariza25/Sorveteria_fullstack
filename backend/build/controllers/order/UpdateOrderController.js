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
exports.UpdateOrderController = void 0;
const UpdateOrderService_1 = require("../../services/order/UpdateOrderService");
const mongodb_1 = require("mongodb");
class UpdateOrderController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.query;
            const { status } = req.body;
            const { deliveryStatus } = req.body;
            const { finishOrder } = req.body;
            const { deliveryStatusDone } = req.body;
            if (!mongodb_1.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid id' });
            }
            const updateOrderService = new UpdateOrderService_1.UpdateOrderService();
            try {
                const order = yield updateOrderService.execute(id, status, deliveryStatus, deliveryStatusDone, finishOrder);
                return res.json(order);
            }
            catch (error) {
                return res.status(400).json({ error: error });
            }
        });
    }
}
exports.UpdateOrderController = UpdateOrderController;
