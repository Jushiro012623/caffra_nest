import {Injectable} from "@nestjs/common";
import {JwtService as JWTS} from "@nestjs/jwt";
import {JwtPayload} from "jsonwebtoken";
import {User} from "@app/user/entities/user.entity";


export type AccessToken = {
    token_type: string
    access_token: string
}

@Injectable()
export class JwtService {

    constructor(private readonly jwtService: JWTS) {
    }

    issueAccessToken(payload: JwtPayload): AccessToken {
        return {
            token_type: "Bearer",
            access_token: this.jwtService.sign(payload)
        } as AccessToken
    }



    async verifyAsync(token: string): Promise<JwtPayload> {
        return await this.jwtService.verifyAsync<JwtPayload>(token)
    }

}