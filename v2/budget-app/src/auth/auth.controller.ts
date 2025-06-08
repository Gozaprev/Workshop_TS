import { Controller, Post, Body, Req, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from '../users/dto/login.dto';
import { PurchaseLoyalCardDto } from './dto/purchase-loyal-card.dto';

// class LoginDto {
//     email: string;
//     password: string;
// }

class RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    // @Post('login')
    // async login(@Body() loginDto: LoginDto) {

    //     const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    //     if (!user) {
    //         throw new UnauthorizedException('Invalid credentials');
    //     }
    //     return this.authService.login(user);
    // }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.email, loginDto.password);
    }

    @UseGuards(JwtAuthGuard)
    @Post('refresh')
    async refresh(@Request() req) {
        return this.authService.refreshToken(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('purchase-loyal-card')
    async purchaseLoyalCard(@Req() req, @Body() purchaseDto: PurchaseLoyalCardDto) {
        const userId = req.user.userId || req.user.sub; // depends on your JWT payload
        return this.authService.purchaseLoyalCard(userId, purchaseDto);
    }
}
