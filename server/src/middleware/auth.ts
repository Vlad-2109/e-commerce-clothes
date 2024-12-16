import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwt_secret = process.env.JWT_SECRET || '';

const authUser = async (req: Request | any, res: Response | any, next: NextFunction) => {
    
    const { token } = req.headers;
    if (!token) {
        return res.json({success: false, message: "Not authorized Login Again"})
    }

    try {
        const token_decode = jwt.verify(token, jwt_secret) as JwtPayload;
        req.body.userId = token_decode.id;
        next();
    } catch (error: any) {
        console.error(error);
        res.json({ success: false, message: error.message });
    } 
}

export default authUser;