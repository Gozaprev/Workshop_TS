//Old code

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, FindManyOptions } from 'typeorm';
// import { Transaction } from './entities/transaction.entity';
// import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';
// import { Budget } from '../budget/entities/budget.entity';

// @Injectable()
// export class TransactionsService {
//     constructor(
//         @InjectRepository(Transaction)
//         private readonly transactionRepository: Repository<Transaction>,

//         @InjectRepository(Budget)
//         private budgetRepository: Repository<Budget>,
//     ) { }

//     async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
//         if (createTransactionDto.budgetId) {
//             const budget = await this.budgetRepository.findOne({
//                 where: { id: createTransactionDto.budgetId },
//             });
//             if (!budget) {
//                 throw new NotFoundException(`Budget with id ${createTransactionDto.budgetId} not found`);
//             }
//         }
//         const transaction = this.transactionRepository.create(createTransactionDto);
//         return this.transactionRepository.save(transaction);
//     }

//     async findAll(filter?: Partial<{ type: string; budgetId: number }>): Promise<Transaction[]> {
//         const options: FindManyOptions<Transaction> = {
//             where: {},
//             relations: ['budget'],
//             order: { date: 'DESC' },
//         };

//         options.where = options.where || {};

//         if (filter) {
//             if (filter.type) {
//                 options.where['type'] = filter.type;
//             }
//             if (filter.budgetId) {
//                 options.where['budgetId'] = filter.budgetId;
//             }
//         }

//         return this.transactionRepository.find(options);
//     }

//     async findOne(id: number): Promise<Transaction> {
//         const transaction = await this.transactionRepository.findOne({
//             where: { id },
//             relations: ['budget'],
//         });
//         if (!transaction) {
//             throw new NotFoundException(`Transaction with id ${id} not found`);
//         }
//         return transaction;
//     }

//     async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
//         const transaction = await this.findOne(id);
//         Object.assign(transaction, updateTransactionDto);
//         return this.transactionRepository.save(transaction);
//     }

//     async remove(id: number): Promise<void> {
//         const transaction = await this.findOne(id);
//         await this.transactionRepository.remove(transaction);
//     }
// }


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Budget } from '../budget/entities/budget.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,

        @InjectRepository(Budget)
        private readonly budgetRepository: Repository<Budget>,
    ) { }

    // async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    //     const { budgetId } = createTransactionDto;

    //     if (budgetId) {
    //         const budgetExists = await this.budgetRepository.exist({ where: { id: budgetId } });
    //         if (!budgetExists) {
    //             throw new NotFoundException(`Budget with id ${budgetId} not found`);
    //         }
    //     }

    //     const transaction = this.transactionRepository.create(createTransactionDto);
    //     return this.transactionRepository.save(transaction);
    // }

    async create(createTransactionDto: CreateTransactionDto & { userId: number }): Promise<Transaction> {
        const { budgetId } = createTransactionDto;

        if (budgetId) {
            const budgetExists = await this.budgetRepository
                .createQueryBuilder('budget')
                .where('budget.id = :id', { id: budgetId })
                .getExists();

            if (!budgetExists) {
                throw new NotFoundException(`Budget with id ${budgetId} not found`);
            }
        }

        const transaction = this.transactionRepository.create(createTransactionDto);
        return this.transactionRepository.save(transaction);
    }


    async findAll(filter?: Partial<{ type: string; budgetId: number }>): Promise<Transaction[]> {
        const where: Record<string, any> = {};

        if (filter?.type) {
            where.type = filter.type;
        }
        if (filter?.budgetId) {
            where.budgetId = filter.budgetId;
        }

        const options: FindManyOptions<Transaction> = {
            where,
            relations: ['budget'],
            order: { date: 'DESC' },
        };

        return this.transactionRepository.find(options);
    }

    async findOne(id: number): Promise<Transaction> {
        const transaction = await this.transactionRepository.findOne({
            where: { id },
            relations: ['budget', 'budget.user'],
        });

        if (!transaction) {
            throw new NotFoundException(`Transaction with id ${id} not found`);
        }
        return transaction;
    }

    async findByBudgetId(budgetId: number): Promise<Transaction[]> {
        return this.transactionRepository.find({
            where: { budgetId },
            relations: ['budget'],
            order: { date: 'DESC' },
        });
    }


    async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
        const transaction = await this.findOne(id);
        Object.assign(transaction, updateTransactionDto);
        return this.transactionRepository.save(transaction);
    }

    async remove(id: number): Promise<void> {
        const transaction = await this.findOne(id);
        await this.transactionRepository.remove(transaction);
    }
}
