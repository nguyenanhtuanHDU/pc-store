import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { IResponse } from 'src/shared/models/response.interface';
import { User } from './enities/user.schema';
import { Response } from 'express';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getAll(@Res() res: Response): Promise<any> {
        const response: IResponse<User[]> = {
            status: HttpStatus.OK,
            message: 'Get all user success',
            subMessage: 'Success',
            data: await this.userService.getAll()
        }
        res.status(HttpStatus.OK).json(response)
    }

    @Post()
    async create(@Body() user: CreateUserDTO, @Res() res: Response): Promise<any> {
        console.log("🚀 ~ user:", user)
        await this.userService.create(user)
        const response: IResponse<User> = {
            status: HttpStatus.OK,
            message: 'Create user success',
            subMessage: 'Success',
            data: null
        }
        res.status(HttpStatus.OK).json(response)
    }

    @Delete(':id')
    async delete(@Res() res: Response, @Param('id') id: string) {
        const response: IResponse<User> = {
            status: HttpStatus.OK,
            message: 'Delete user success',
            subMessage: 'Success',
            data: await this.userService.delete(id)
        }
        res.status(HttpStatus.OK).json(response)
    }
}
