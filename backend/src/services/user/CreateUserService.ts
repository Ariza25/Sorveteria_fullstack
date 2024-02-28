import { PrismaClient } from "@prisma/client";
import {hash} from "bcrypt";

interface CreateUserProps{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    updated_at?: string;
    created_at?: string;
}

class CreateUserService{
    async execute({name, email, password, confirmPassword}: CreateUserProps){
        const prisma = new PrismaClient();

        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if(userAlreadyExists){
            throw new Error("User already exists!");
        }

        if(!name || !email || !password || !confirmPassword){
            throw new Error("preencha todos os campos");
        }

        const hashedPassword = await hash(password, 10);

        try {
            const user = await prisma.user.create({ 
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    confirmPassword: hashedPassword
                }
            });

            return user;
        } catch (error) {
            console.error("Error creating user: ", error);
            throw error;
        }
    }
}

export { CreateUserService}