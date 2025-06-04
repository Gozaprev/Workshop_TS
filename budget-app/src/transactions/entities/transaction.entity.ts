import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Budget } from '../../budget/entities/budget.entity';

export enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense',
}

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    title: string;

    @Column({ type: 'text' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @Column('decimal', { precision: 12, scale: 2 })
    @IsNumber()
    amount: number;

    @Column({ type: 'enum', enum: TransactionType })
    @IsEnum(TransactionType)
    type: TransactionType;

    @Column({ type: 'date' })
    date: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Foreign key column
    @Column({ nullable: true })
    @IsOptional()
    budgetId?: number;

    // Relationship to Budget entity
    @ManyToOne(() => Budget, (budget) => budget.transactions, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'budgetId' })
    budget?: Budget;


}
