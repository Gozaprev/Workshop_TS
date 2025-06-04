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

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { Transaction } from '../transactions/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, Transaction])],
  providers: [BudgetService],
  controllers: [BudgetController],
  exports: [TypeOrmModule], // Export if other modules need Budget repository
})
export class BudgetModule { }
