import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() body: { name: string; email: string; username: string; password: string }) {
        const user = await this.usersService.createUser(
            body.name,
            body.email,
            body.username,
            body.password,
        );
        return {
            message: 'Usuário registrado com sucesso',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
            },
        };  
        
    }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }
}