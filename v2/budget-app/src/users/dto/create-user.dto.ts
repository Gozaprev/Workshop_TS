import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    role?: UserRole; // optional, default to regular in entity
}


// export class LoginDto {
//     @IsEmail()
//     email: string;

//     @IsString()
//     @IsNotEmpty()
//     password: string;
// }