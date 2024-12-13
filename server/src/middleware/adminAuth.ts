import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwt_secret = process.env.JWT_SECRET || '';

const adminAuth = async (req: Request | any, res: Response | any, next: NextFunction) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({success: false, message: "Not authorized Login Again"})
        }
        const token_decode = jwt.verify(token, jwt_secret);
        const { id } = token_decode as JwtPayload;
        if (id !== process.env.ADMIN_EMAIL! + process.env.ADMIN_PASSWORD!) {
          return res.json({success: false, message: 'Not authorized Login Again'});
        }
        next();
    } catch (error: any) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export default adminAuth;