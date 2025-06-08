// Old

// import { Module } from '@nestjs/common';
// import { BudgetService } from './budget.service';
// import { BudgetController } from './budget.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Budget } from './entities/budget.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([Budget])],
//   controllers: [BudgetController],
//   providers: [BudgetService],
// })
// export class BudgetModule {}

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { Transaction } from '../transactions/entities/transaction.entity';
//import { TransactionsService } from '../transactions/transactions.service';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Budget]),
  forwardRef(() => TransactionsModule),],
  providers: [BudgetService],
  controllers: [BudgetController],
  exports: [BudgetService, TypeOrmModule],
})
export class BudgetModule { }
