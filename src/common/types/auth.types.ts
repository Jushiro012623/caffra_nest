import {JwtPayload} from "jsonwebtoken";
import {Request} from "express";

export interface AuthRequest extends Request {
    user: JwtPayload;
}

export type AccessToken = {
    token_type: string;
    access_token: string;
};
