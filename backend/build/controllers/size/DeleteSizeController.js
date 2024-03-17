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
exports.DeleteSizeController = void 0;
const DeleteSizeService_1 = require("../../services/size/DeleteSizeService");
class DeleteSizeController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deleteSizeService = new DeleteSizeService_1.DeleteSizeService();
                yield deleteSizeService.execute(id);
                return res.status(200).json({ message: "Size deleted successfully" });
            }
            catch (err) {
                return res.status(500).json(err.message);
            }
        });
    }
}
exports.DeleteSizeController = DeleteSizeController;