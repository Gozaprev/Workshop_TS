import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60m' }, // Access token expiry
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }



// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { UsersModule } from '../users/users.module';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { JwtStrategy } from './jwt.strategy';

// @Module({
//     imports: [
//         UsersModule,
//         PassportModule,
//         JwtModule.register({
//             secret: 'your_jwt_secret_key', // Use environment variable in production
//             signOptions: { expiresIn: '1h' },
//         }),
//     ],
//     providers: [AuthService, JwtStrategy],
//     controllers: [AuthController],
// })
// export class AuthModule { }
