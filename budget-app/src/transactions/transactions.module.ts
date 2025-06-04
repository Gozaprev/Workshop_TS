import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Budget } from '../budget/entities/budget.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Budget])],
    providers: [TransactionsService],
    controllers: [TransactionsController],
})
export class TransactionsModule { }
