//Old code:

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// @Entity('budgets')
// export class Budget {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column({ name: 'total_amount' })
//   totalAmount: number;

//   @Column({ name: 'from_date' })
//   fromDate: Date;
//   //fromDate: new Date(createBudgetDto.startDate),

//   @Column({ name: 'to_date' })
//   toDate: Date;

//   @CreateDateColumn({ name: 'created_at', default: new Date() })
//   createdAt: Date;

//   @UpdateDateColumn({ name: 'updated_at', nullable: true, default: null })
//   updatedAt: Date;
// }

// // startDate: new Date(createBudgetDto.startDate),
// //       endDate: new Date(createBudgetDto.endDate),

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 12, scale: 2 })
  totalAmount: number;

  @Column({ type: 'date' })
  fromDate: Date;

  @Column({ type: 'date' })
  toDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToMany(() => Transaction, (transaction) => transaction.budget)
  // transactions: Transaction[];


  @OneToMany(() => Transaction, (transaction) => transaction.budget)
  transactions?: Transaction[];

}
