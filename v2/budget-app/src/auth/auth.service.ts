import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { PurchaseLoyalCardDto } from '../auth/dto/purchase-loyal-card.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    // Validate user credentials
    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            // Return user without password
            const { password, ...result } = user;
            return result as User;
        }
        return null;
    }

    // Login and generate JWT tokens
    // async login(user: User) {
    //     const payload = { sub: user.id, email: user.email, role: user.role };
    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     };
    // }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // Register new user with hashed password
    async register(userData: CreateUserDto): Promise<User> {
        if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
            throw new Error('Missing required user data');
        }

        const createUserDto: CreateUserDto = {
            email: userData.email,
            password: await bcrypt.hash(userData.password, 10),
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role || UserRole.REGULAR,
        };

        const newUser = await this.usersService.create(createUserDto);
        const { password, ...result } = newUser;
        return result as User;
    }

    // Refresh token logic (optional: implement refresh tokens properly)
    async refreshToken(userId: number) {
        const user = await this.usersService.findOne(userId);
        if (!user) throw new UnauthorizedException();
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async purchaseLoyalCard(userId: number, purchaseDto: PurchaseLoyalCardDto): Promise<{ message: string }> {
        // Example logic: check user eligibility, process payment, update user status, etc.

        // just for demo purposes return success message
        return { message: 'Loyal card purchased successfully' };
    }

}

