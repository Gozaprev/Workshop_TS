import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) { }

  // @Post()
  // create(@Body() createBudgetDto: CreateBudgetDto) {
  //   return 'This action adds a new budget';
  // }

  @Post()
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetService.create(createBudgetDto);
  }

  // @Get()
  // findAll() {
  //   return 'This action returns all budget';
  // }

  @Get()
  findAll() {
    return this.budgetService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return `This action returns a #${id} budget`;
  // }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.budgetService.findOne(id);
  }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
  //   return `This action updates a #${id} budget`;
  // }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    return this.budgetService.update(id, updateBudgetDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return `This action removes a #${id} budget`;
  // }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content on successful delete
  remove(@Param('id', ParseIntPipe) id: number) {
    this.budgetService.remove(id);
  }
}
