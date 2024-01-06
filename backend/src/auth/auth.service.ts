import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async login(authLogin: AuthLoginDTO): Promise<boolean> {
        const userSearch = await this.userService.getSingle({ username: authLogin.username })
        if (!userSearch) {
            throw new NotFoundException("User not found")
        }
        const isMatch = await bcrypt.compare(authLogin.password, userSearch.password);
        if (!isMatch) {
            throw new UnauthorizedException("Password invalid")
        }
        return true
    }
}
