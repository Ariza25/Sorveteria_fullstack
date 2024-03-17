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
exports.CreateContactController = void 0;
const CreateContactService_1 = require("../../services/contact/CreateContactService");
class CreateContactController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, message } = request.body;
                const createContactService = new CreateContactService_1.CreateContactService();
                const contact = yield createContactService.execute({
                    name,
                    email,
                    message
                });
                return response.status(200).json(contact);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.CreateContactController = CreateContactController;
