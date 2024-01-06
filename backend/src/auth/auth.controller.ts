import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { IResponse } from 'src/shared/models/response.interface';
import { User } from 'src/user/enities/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() authLogin: AuthLoginDTO, @Res() res: Response) {
        const response: IResponse<User[]> = {
            status: HttpStatus.OK,
            message: 'Login success',
            subMessage: 'Success',
            data: await this.authService.login(authLogin)
        }
        res.status(HttpStatus.OK).json(response)
    }
}
