
// Old:

// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Transaction } from './entities/transaction.entity';
// import { TransactionsService } from './transactions.service';
// import { TransactionsController } from './transactions.controller';
// import { Budget } from '../budget/entities/budget.entity';

// @Module({
//     imports: [TypeOrmModule.forFeature([Transaction, Budget])],
//     providers: [TransactionsService],
//     controllers: [TransactionsController],
// })
// export class TransactionsModule { }

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { BudgetModule } from '../budget/budget.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction]),
        forwardRef(() => BudgetModule),
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService],
    exports: [TransactionsService],
})
export class TransactionsModule { }
