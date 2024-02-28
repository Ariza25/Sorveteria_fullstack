import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { sign } from 'jsonwebtoken';

interface AuthRequestProps {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password}: AuthRequestProps) {
        const prisma = new PrismaClient();

        const user = await prisma.user.findFirst({ where: { email: email } });

        if (!user) {
            throw new Error("User not found");
        }

        if (!user.password) {
            throw new Error("Password not found");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Incorrect password");
        }

        //gerar token JWT
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            secret,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        );
        return { id: user.id, name: user.name, email: user.email, token: token }
    }
}

export { AuthUserService }