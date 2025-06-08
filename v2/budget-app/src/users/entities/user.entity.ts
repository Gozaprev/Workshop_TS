import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Budget } from '../../budget/entities/budget.entity';

export enum UserRole {
    REGULAR = 'regular',
    LOYAL_CUSTOMER = 'loyal_customer',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string; // hashed

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.REGULAR })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Budget, (budget) => budget.user)
    budgets: Budget[];
}
