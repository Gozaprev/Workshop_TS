import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';


// @Injectable()
// export class BudgetService {
//   create(createBudgetDto: CreateBudgetDto) {
//     return 'This action adds a new budget';
//   }

//   findAll() {
//     return `This action returns all budget`;
//   }


//   findOne(id: number) {
//     return `This action returns a #${id} budget`;
//   }

//   update(id: number, updateBudgetDto: UpdateBudgetDto) {
//     return `This action updates a #${id} budget`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} budget`;
//   }
// }

@Injectable()
export class BudgetService {
  private budgets: Budget[] = [];
  private nextId = 1;


  create(createBudgetDto: CreateBudgetDto): Budget {
    const now = new Date();

    const newBudget: Budget = {
      id: this.nextId++,
      ...createBudgetDto,
      createdAt: now,
      updatedAt: now,
    };
    this.budgets.push(newBudget);
    return newBudget;
  }

  // create(createBudgetDto: CreateBudgetDto): Budget {
  //   const newBudget: Budget = {
  //     id: this.nextId++,
  //     ...createBudgetDto,
  //   };
  //   this.budgets.push(newBudget);
  //   return newBudget;
  // }

  findAll(): Budget[] {
    return this.budgets;
  }

  findOne(id: number): Budget {
    const budget = this.budgets.find((b) => b.id === id);
    if (!budget) {
      throw new NotFoundException(`Budget with id ${id} not found`);
    }
    return budget;
  }

  // update(id: number, updateBudgetDto: UpdateBudgetDto): Budget {
  //   const budgetIndex = this.budgets.findIndex((b) => b.id === id);
  //   if (budgetIndex === -1) {
  //     throw new NotFoundException(`Budget with id ${id} not found`);
  //   }
  //   const updatedBudget = {
  //     ...this.budgets[budgetIndex],
  //     ...updateBudgetDto,
  //   };
  //   this.budgets[budgetIndex] = updatedBudget;
  //   return updatedBudget;
  // }

  update(id: number, updateBudgetDto: UpdateBudgetDto): Budget {
    const budgetIndex = this.budgets.findIndex((b) => b.id === id);
    if (budgetIndex === -1) {
      throw new NotFoundException(`Budget with id ${id} not found`);
    }
    const updatedBudget = {
      ...this.budgets[budgetIndex],
      ...updateBudgetDto,
      updatedAt: new Date(),
    };
    this.budgets[budgetIndex] = updatedBudget;
    return updatedBudget;
  }

  remove(id: number): void {
    const budgetIndex = this.budgets.findIndex((b) => b.id === id);
    if (budgetIndex === -1) {
      throw new NotFoundException(`Budget with id ${id} not found`);
    }
    this.budgets.splice(budgetIndex, 1);
  }
}