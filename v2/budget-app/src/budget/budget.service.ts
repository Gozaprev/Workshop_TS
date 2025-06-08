// // Old code:

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateBudgetDto } from './dto/create-budget.dto';
// import { UpdateBudgetDto } from './dto/update-budget.dto';
// import { Budget } from './entities/budget.entity';


// // @Injectable()
// // export class BudgetService {
// //   create(createBudgetDto: CreateBudgetDto) {
// //     return 'This action adds a new budget';
// //   }

// //   findAll() {
// //     return `This action returns all budget`;
// //   }


// //   findOne(id: number) {
// //     return `This action returns a #${id} budget`;
// //   }

// //   update(id: number, updateBudgetDto: UpdateBudgetDto) {
// //     return `This action updates a #${id} budget`;
// //   }

// //   remove(id: number) {
// //     return `This action removes a #${id} budget`;
// //   }
// // }

// @Injectable()
// export class BudgetService {
//   private budgets: Budget[] = [];
//   private nextId = 1;


//   create(createBudgetDto: CreateBudgetDto): Budget {
//     const now = new Date();

//     const newBudget: Budget = {
//       id: this.nextId++,
//       ...createBudgetDto,
//       createdAt: now,
//       updatedAt: now,
//     };
//     this.budgets.push(newBudget);
//     return newBudget;
//   }

//   // create(createBudgetDto: CreateBudgetDto): Budget {
//   //   const newBudget: Budget = {
//   //     id: this.nextId++,
//   //     ...createBudgetDto,
//   //   };
//   //   this.budgets.push(newBudget);
//   //   return newBudget;
//   // }

//   findAll(): Budget[] {
//     return this.budgets;
//   }

//   findOne(id: number): Budget {
//     const budget = this.budgets.find((b) => b.id === id);
//     if (!budget) {
//       throw new NotFoundException(`Budget with id ${id} not found`);
//     }
//     return budget;
//   }

//   // update(id: number, updateBudgetDto: UpdateBudgetDto): Budget {
//   //   const budgetIndex = this.budgets.findIndex((b) => b.id === id);
//   //   if (budgetIndex === -1) {
//   //     throw new NotFoundException(`Budget with id ${id} not found`);
//   //   }
//   //   const updatedBudget = {
//   //     ...this.budgets[budgetIndex],
//   //     ...updateBudgetDto,
//   //   };
//   //   this.budgets[budgetIndex] = updatedBudget;
//   //   return updatedBudget;
//   // }

//   update(id: number, updateBudgetDto: UpdateBudgetDto): Budget {
//     const budgetIndex = this.budgets.findIndex((b) => b.id === id);
//     if (budgetIndex === -1) {
//       throw new NotFoundException(`Budget with id ${id} not found`);
//     }
//     const updatedBudget = {
//       ...this.budgets[budgetIndex],
//       ...updateBudgetDto,
//       updatedAt: new Date(),
//     };
//     this.budgets[budgetIndex] = updatedBudget;
//     return updatedBudget;
//   }

//   remove(id: number): void {
//     const budgetIndex = this.budgets.findIndex((b) => b.id === id);
//     if (budgetIndex === -1) {
//       throw new NotFoundException(`Budget with id ${id} not found`);
//     }
//     this.budgets.splice(budgetIndex, 1);
//   }
// }

// New code:

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from './entities/budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

// @Injectable()
// export class BudgetService {
//   constructor(
//     @InjectRepository(Budget)
//     private readonly budgetRepository: Repository<Budget>,
//   ) { }

//   async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
//     const budget = this.budgetRepository.create(createBudgetDto);
//     return this.budgetRepository.save(budget);
//   }

//   async findAll(): Promise<Budget[]> {
//     return this.budgetRepository.find();
//   }

//   async findOne(id: number): Promise<Budget> {
//     const budget = await this.budgetRepository.findOne({ where: { id } });
//     if (!budget) {
//       throw new NotFoundException(`Budget with id ${id} not found`);
//     }
//     return budget;
//   }

//   async update(id: number, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
//     const budget = await this.findOne(id);
//     Object.assign(budget, updateBudgetDto);
//     return this.budgetRepository.save(budget);
//   }

//   async remove(id: number): Promise<void> {
//     const budget = await this.findOne(id);
//     await this.budgetRepository.remove(budget);
//   }
// }


@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) { }

  async create(createBudgetDto: CreateBudgetDto & { user: { id: number } }): Promise<Budget> {
    const budget = this.budgetRepository.create(createBudgetDto);
    return this.budgetRepository.save(budget);
  }

  async findOne(id: number, userId?: number): Promise<Budget> {
    const budget = await this.budgetRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!budget) {
      throw new NotFoundException(`Budget with id ${id} not found`);
    }
    if (userId && budget.user.id !== userId) {
      throw new ForbiddenException('You do not own this budget');
    }
    return budget;
  }

  async update(id: number, updateBudgetDto: UpdateBudgetDto, userId: number): Promise<Budget> {
    const budget = await this.findOne(id, userId);
    Object.assign(budget, updateBudgetDto);
    return this.budgetRepository.save(budget);
  }

  async remove(id: number, userId: number): Promise<void> {
    const budget = await this.findOne(id, userId);
    await this.budgetRepository.remove(budget);
  }

  async findAll(userId: number): Promise<Budget[]> {
    return this.budgetRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
