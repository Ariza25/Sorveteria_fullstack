import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { verify, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

interface Payload {
    sub: string;
}

interface ErrorResponse {
    error: string;
}

interface Request extends ExpressRequest {
    user?: string;
}

export async function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ error: "Token missing" } as ErrorResponse);
    }

    const parts = authToken.split(" ");

    if (parts.length !== 2) {
        return res.status(401).json({ error: "Token error" } as ErrorResponse);
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: "Token malformatted" } as ErrorResponse);
    }

    try {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }

        const { sub } = verify(token, secret) as Payload;

        req.user = sub;
        next();

    } catch (err) {
        if (err instanceof JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token' } as ErrorResponse);
        } else if (err instanceof TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired' } as ErrorResponse);
        } else {
            return res.status(401).json({ error: 'Token invalid' } as ErrorResponse);
        }
    }
}