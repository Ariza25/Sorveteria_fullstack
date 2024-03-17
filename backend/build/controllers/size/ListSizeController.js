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
exports.ListSizeController = void 0;
const ListSizeService_1 = require("../../services/size/ListSizeService");
class ListSizeController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listSizeService = new ListSizeService_1.ListSizeService();
                const sizes = yield listSizeService.execute();
                return res.status(200).json({ message: "Sizes listed successfully", sizes });
            }
            catch (err) {
                return res.status(500).json(err.message);
            }
        });
    }
}
exports.ListSizeController = ListSizeController;
