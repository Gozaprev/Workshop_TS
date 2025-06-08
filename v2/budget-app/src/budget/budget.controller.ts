// without authentication

// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   ParseIntPipe,
//   HttpCode,
//   HttpStatus,
//   Inject, forwardRef
// } from '@nestjs/common';
// import { BudgetService } from './budget.service';
// import { CreateBudgetDto } from './dto/create-budget.dto';
// import { UpdateBudgetDto } from './dto/update-budget.dto';
// import { TransactionsService } from '../transactions/transactions.service';

// @Controller('budget')
// export class BudgetController {
//   constructor(private readonly budgetService: BudgetService,
//     @Inject(forwardRef(() => TransactionsService))
//     private readonly transactionsService: TransactionsService,) { }


//   // @Post()
//   // create(@Body() createBudgetDto: CreateBudgetDto) {
//   //   return 'This action adds a new budget';
//   // }

//   @Post()
//   create(@Body() createBudgetDto: CreateBudgetDto) {
//     return this.budgetService.create(createBudgetDto);
//   }

//   // @Get()
//   // findAll() {
//   //   return 'This action returns all budget';
//   // }

//   @Get()
//   findAll() {
//     return this.budgetService.findAll();
//   }

//   // @Get(':id')
//   // findOne(@Param('id') id: string) {
//   //   return `This action returns a #${id} budget`;
//   // }

//   @Get(':id')
//   findOne(@Param('id', ParseIntPipe) id: number) {
//     return this.budgetService.findOne(id);
//   }


//   @Get(':id/transactions')
//   async getTransactionsByBudget(@Param('id', ParseIntPipe) id: number) {
//     return this.transactionsService.findByBudgetId(id);
//   }


//   // @Patch(':id')
//   // update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
//   //   return `This action updates a #${id} budget`;
//   // }

//   @Patch(':id')
//   update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() updateBudgetDto: UpdateBudgetDto,
//   ) {
//     return this.budgetService.update(id, updateBudgetDto);
//   }

//   // @Delete(':id')
//   // remove(@Param('id') id: string) {
//   //   return `This action removes a #${id} budget`;
//   // }
//   @Delete(':id')
//   @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content on successful delete
//   remove(@Param('id', ParseIntPipe) id: number) {
//     this.budgetService.remove(id);
//   }
// }


// with authentication

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BudgetService } from './budget.service';
import { Transaction } from '../transactions/entities/transaction.entity';
import { TransactionsService } from '../transactions/transactions.service';

// @Controller('budgets')
// @UseGuards(JwtAuthGuard)
// export class BudgetController {
//   constructor(private readonly budgetService: BudgetService) { }

//   @Post()
//   create(@Body() createBudgetDto, @Request() req) {
//     // Attach user ownership here if needed
//     return this.budgetService.create({ ...createBudgetDto, userId: req.user.sub });
//   }

//   @Get(':id')
//   async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
//     const budget = await this.budgetService.findOne(id);
//     // if (budget.userId !== req.user.sub) {
//     //   throw new ForbiddenException('You do not own this budget');
//     // }
//     if (budget.user.id !== req.user.sub) {
//       throw new ForbiddenException('You do not own this budget');
//     }
//     return budget;
//   }

//   @Put(':id')
//   async update(@Param('id', ParseIntPipe) id: number, @Body() updateBudgetDto, @Request() req) {
//     const budget = await this.budgetService.findOne(id);
//     if (budget.user.id !== req.user.sub) {
//       throw new ForbiddenException('You do not own this budget');
//     }
//     return this.budgetService.update(id, updateBudgetDto);
//   }

//   @Delete(':id')
//   async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
//     const budget = await this.budgetService.findOne(id);
//     if (budget.user.id !== req.user.sub) {
//       throw new ForbiddenException('You do not own this budget');
//     }
//     return this.budgetService.remove(id);
//   }
// }


@Controller('budgets')
@UseGuards(JwtAuthGuard)
export class BudgetController {
  constructor(private readonly budgetService: BudgetService,
    private readonly transactionsService: TransactionsService,) { }

  @Post()
  create(@Body() createBudgetDto, @Request() req) {
    return this.budgetService.create({ ...createBudgetDto, user: { id: req.user.sub } });
  }

  @Get()
  findAll(@Request() req) {
    return this.budgetService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.budgetService.findOne(id, req.user.sub);
  }

  @Get(':id/transactions')
  async getTransactionsForBudget(@Param('id') id: string): Promise<Transaction[]> {
    const budgetId = Number(id);
    return this.transactionsService.findAll({ budgetId });
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBudgetDto, @Request() req) {
    return this.budgetService.update(id, updateBudgetDto, req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.budgetService.remove(id, req.user.sub);
  }
}
