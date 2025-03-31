import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() body) {
        return this.usersService.createUser(body.name, body.email, body.password);
    }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }
}