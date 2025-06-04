import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionsService.create(createTransactionDto);
    }

    @Get()
    findAll(
        @Query('type') type?: string,
        //     @Query('budgetId', ParseIntPipe) budgetId?: number,
        // ) {
        //     const filter = { type, budgetId };
        //     return this.transactionsService.findAll(filter);
        @Query('budgetId', new ParseIntPipe({ optional: true })) budgetId?: number,
    ) {
        const filter = { type, budgetId };
        return this.transactionsService.findAll(filter);
    }


    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.transactionsService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTransactionDto: UpdateTransactionDto,
    ) {
        return this.transactionsService.update(id, updateTransactionDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.transactionsService.remove(id);
    }
}
