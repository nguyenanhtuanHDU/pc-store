import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { IUser } from 'src/user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async login(authLogin: AuthLoginDTO): Promise<any> {
        const userSearch = await this.userService.getSingle({ username: authLogin.username })
        if (!userSearch) {
            throw new NotFoundException("User not found")
        }
        const isMatch = await bcrypt.compare(authLogin.password, userSearch.password);
        if (!isMatch) {
            throw new UnauthorizedException("Password invalid")
        }
        const payload = {
            username: userSearch.username
            // roles: []
        }
        return {
            accessToken: await this.createAccessToken(payload)
        }
    }

    async createAccessToken(payload: Partial<IUser>): Promise<string> {
        return await this.jwtService.signAsync(payload)
    }
}
