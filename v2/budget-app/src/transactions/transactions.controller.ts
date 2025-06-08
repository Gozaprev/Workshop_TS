// Without authentication

// import {
//     Controller,
//     Get,
//     Post,
//     Body,
//     Put,
//     Param,
//     Delete,
//     Query,
//     ParseIntPipe,
// } from '@nestjs/common';
// import { TransactionsService } from './transactions.service';
// import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';

// @Controller('transactions')
// export class TransactionsController {
//     constructor(private readonly transactionsService: TransactionsService) { }

//     @Post()
//     create(@Body() createTransactionDto: CreateTransactionDto) {
//         return this.transactionsService.create(createTransactionDto);
//     }

//     @Get()
//     findAll(
//         @Query('type') type?: string,
//         //     @Query('budgetId', ParseIntPipe) budgetId?: number,
//         // ) {
//         //     const filter = { type, budgetId };
//         //     return this.transactionsService.findAll(filter);
//         @Query('budgetId', new ParseIntPipe({ optional: true })) budgetId?: number,
//     ) {
//         const filter = { type, budgetId };
//         return this.transactionsService.findAll(filter);
//     }


//     @Get(':id')
//     findOne(@Param('id', ParseIntPipe) id: number) {
//         return this.transactionsService.findOne(id);
//     }

//     @Get(':id/transactions')
//     async getTransactionsByBudget(@Param('id', ParseIntPipe) id: number) {
//         return this.transactionsService.findByBudgetId(id);
//     }

//     @Put(':id')
//     update(
//         @Param('id', ParseIntPipe) id: number,
//         @Body() updateTransactionDto: UpdateTransactionDto,
//     ) {
//         return this.transactionsService.update(id, updateTransactionDto);
//     }

//     @Delete(':id')
//     remove(@Param('id', ParseIntPipe) id: number) {
//         return this.transactionsService.remove(id);
//     }
// }


// With authentication

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query,
    UseGuards,
    Request,
    ParseIntPipe,
    ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Post()
    async create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
        // Attach userId from request to transaction (assuming budget ownership or direct userId)
        // If transactions link to budget, ensure budget belongs to user in service layer
        //return this.transactionsService.create(createTransactionDto, req.user.sub);
        return this.transactionsService.create({ ...createTransactionDto, userId: req.user.sub });
    }

    // @Get()
    // async findAll(): Promise<Transaction[]> {
    //     return this.transactionsService.findAll();
    // }

    @Get()
    async findAll(
        @Query('type') type?: string,
        @Query('budgetId') budgetId?: string,
    ): Promise<Transaction[]> {
        // Convert budgetId to number if present
        const filter: Partial<{ type: string; budgetId: number }> = {};
        if (type) filter.type = type;
        if (budgetId) filter.budgetId = Number(budgetId);

        return this.transactionsService.findAll(filter);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const transaction = await this.transactionsService.findOne(id);
        // Check ownership: assuming transaction.budget.userId or transaction.userId
        if (transaction.budget?.user.id !== req.user.sub) {
            throw new ForbiddenException('You do not own this transaction');
        }
        return transaction;
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTransactionDto: UpdateTransactionDto,
        @Request() req,
    ) {
        const transaction = await this.transactionsService.findOne(id);
        if (transaction.budget?.user.id !== req.user.sub) {
            throw new ForbiddenException('You do not own this transaction');
        }
        return this.transactionsService.update(id, updateTransactionDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const transaction = await this.transactionsService.findOne(id);
        if (transaction.budget?.user.id !== req.user.sub) {
            throw new ForbiddenException('You do not own this transaction');
        }
        return this.transactionsService.remove(id);
    }
}
