import { NextFunction ,Request,Response} from "express";
import { UserRole } from "../../generated/prisma/enums";
import jwt, { JwtPayload } from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload;
        }
    }
}

export const auth = (role?: UserRole[]) => {
    
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.send("Please provide token")
        }

        try {
            const decoded = jwt.verify(token as string, "very secret")
            if (!decoded) {
                return res.send("Unauthorized")
            }

            req.user = decoded as JwtPayload;

            next()
        } catch (error) {
            console.log(error)
        }

    }
}