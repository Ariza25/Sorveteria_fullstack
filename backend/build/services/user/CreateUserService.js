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
exports.CreateUserService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
class CreateUserService {
    execute({ name, email, password, confirmPassword }) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const userAlreadyExists = yield prisma.user.findFirst({
                where: {
                    email
                }
            });
            if (userAlreadyExists) {
                throw new Error("User already exists!");
            }
            if (!name || !email || !password || !confirmPassword) {
                throw new Error("preencha todos os campos");
            }
            const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
            try {
                const user = yield prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                        confirmPassword: hashedPassword
                    }
                });
                return user;
            }
            catch (error) {
                console.error("Error creating user: ", error);
                throw error;
            }
        });
    }
}
exports.CreateUserService = CreateUserService;
