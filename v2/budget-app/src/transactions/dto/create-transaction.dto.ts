import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    amount: number;

    @IsEnum(TransactionType)
    type: TransactionType;

    @IsDateString()
    date: string;

    @IsOptional()
    @IsNumber()
    budgetId?: number;
}
