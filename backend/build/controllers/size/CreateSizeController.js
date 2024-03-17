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
exports.CreateSizeController = void 0;
const CreateSizeService_1 = require("../../services/size/CreateSizeService");
class CreateSizeController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, updated_at, created_at } = request.body;
            const sizeService = new CreateSizeService_1.CreateSizeService();
            try {
                const size = yield sizeService.execute({ id, name, updated_at, created_at });
                return response.status(200).json({ message: 'Size created successfully', size });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({ error: 'An error occurred while creating the size.', details: error });
            }
        });
    }
}
exports.CreateSizeController = CreateSizeController;
