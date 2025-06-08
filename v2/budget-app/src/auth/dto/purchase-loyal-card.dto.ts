// src/auth/dto/purchase-loyal-card.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class PurchaseLoyalCardDto {
    @IsOptional()
    @IsString()
    paymentMethod?: string;
}
