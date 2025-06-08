# 💰 Finance Tracker Workshop

<div align="center">
  <h3>Build a Personal Finance Tracking Application</h3>
  <p><strong>NestJS • TypeORM • PostgreSQL • JWT Authentication</strong></p>
  
  ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
</div>

---

## 📋 Table of Contents

- [🎯 Workshop Overview](#-workshop-overview)
- [🚀 Getting Started](#-getting-started)
- [🏗️ Workshop Architecture](#️-workshop-architecture)
- [📊 Workshop Levels](#-workshop-levels)
  - [🟢 Easy Level](#-easy-level)
  - [🟡 Medium Level](#-medium-level)
  - [🔴 Hard Level](#-hard-level)
- [🎁 Premium Features](#-premium-features)
- [💡 Tips for Success](#-tips-for-success)
- [📚 Additional Resources](#-additional-resources)

---

## 🎯 Workshop Overview

Welcome to the **Finance Tracker Workshop**! This hands-on workshop will guide you through building a comprehensive personal finance tracking application from scratch.

### 🎪 What You'll Build

By the end of this workshop, you'll have created a full-featured finance tracker that includes:

- 💳 **Transaction Management** - Track income and expenses with detailed categorization
- 📊 **Budget Planning** - Create and manage budgets for specific periods
- 🔐 **User Authentication** - Secure JWT-based authentication system
- 👑 **Premium Features** - Role-based access with loyal customer benefits
- 📈 **Analytics Dashboard** - Advanced financial insights and reporting

### 🛠️ Tech Stack

- **Backend Framework**: NestJS (Node.js)
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Class-validator & Class-transformer
- **Language**: TypeScript

---

## 🚀 Getting Started

Before diving into the workshop levels, make sure you've completed the setup process outlined in the [SETUP.md](./SETUP.md) file.

### 📁 Project Structure

```
src/
├── auth/           # Authentication module
├── budget/         # Budget management
├── transactions/   # Transaction handling
├── users/          # User management
└── app.module.ts   # Main application module
```

## 📊 Workshop Levels

Complete the workshop at your own pace, progressing through each level:

---

## 🟢 Easy Level

> **Objective**: Complete partial implementations and create basic CRUD operations

### 🎯 Your Mission

Get familiar with NestJS basics by implementing essential budget management functionality.

### ✅ Tasks Checklist

#### 1. **Complete Budget Service Implementation**

- [ ] Navigate to `src/budget/budget.service.ts`
- [ ] Implement the `create()` method to handle budget creation
- [ ] Implement the `findAll()` method to retrieve all budgets
- [ ] Implement the `findOne()` method to get a specific budget
- [ ] Implement the `update()` method to modify existing budgets
- [ ] Implement the `remove()` method to delete budgets

#### 2. **Complete Budget Controller**

- [ ] Open `src/budget/budget.controller.ts`
- [ ] Add proper HTTP decorators (`@Get`, `@Post`, `@Put`, `@Delete`)
- [ ] Implement request validation using DTOs
- [ ] Add proper response handling

### 🎯 Success Criteria

- ✅ All budget service methods return meaningful data (not placeholder strings)
- ✅ Budget controller handles all CRUD operations correctly
- ✅ API endpoints respond with proper HTTP status codes
- ✅ No linter errors in the budget module

### 🧪 Testing Your Work

Use tools like **Postman** or **Thunder Client** to test:

- `POST /budgets` - Create a new budget
- `GET /budgets` - Retrieve all budgets
- `GET /budgets/:id` - Get specific budget
- `PUT /budgets/:id` - Update a budget
- `DELETE /budgets/:id` - Remove a budget

---

## 🟡 Medium Level

> **Objective**: Create a complete transactions module with database integration

### 🎯 Your Mission

Build the transaction system from scratch, including entities, services, controllers, and database relationships.

### 📋 Transaction Entity Structure

Your `Transaction` entity should include:

```typescript
{
  id: number;                    // Primary key
  title: string;                 // Transaction title
  description: string;           // Detailed description
  amount: number;                // Transaction amount
  type: TransactionType;         // 'income' | 'expense' (enum)
  date: Date;                    // Transaction date
  createdAt: Date;              // Record creation time
  updatedAt: Date;              // Last update time
  budgetId?: number;            // Foreign key to budget
}
```

### ✅ Tasks Checklist

#### 1. **Create Transaction Entity**

- [ ] Create `src/transactions/entities/transaction.entity.ts`
- [ ] Define the `TransactionType` enum
- [ ] Implement proper TypeORM decorators
- [ ] Add validation decorators

#### 2. **Build Transaction Module**

- [ ] Create `src/transactions/transactions.module.ts`
- [ ] Create `src/transactions/transactions.service.ts`
- [ ] Create `src/transactions/transactions.controller.ts`
- [ ] Create DTOs: `create-transaction.dto.ts` and `update-transaction.dto.ts`

#### 3. **Implement CRUD Operations**

- [ ] `create()` - Add new transactions
- [ ] `findAll()` - Retrieve all transactions with filtering
- [ ] `findOne()` - Get transaction by ID
- [ ] `update()` - Modify existing transactions
- [ ] `remove()` - Delete transactions

#### 4. **Database Relationships**

- [ ] Establish one-to-many relationship: Budget → Transactions
- [ ] Update `src/budget/entities/budget.entity.ts`
- [ ] Update `src/transactions/entities/transaction.entity.ts`
- [ ] Test relationship queries

#### 5. **Module Integration**

- [ ] Register TypeORM entities in modules
- [ ] Implement repository patterns
- [ ] Add proper error handling

### 🎯 Success Criteria

- ✅ Transaction entity properly defined with all required fields
- ✅ All CRUD operations work correctly
- ✅ Database relationships function properly
- ✅ DTOs validate request data effectively
- ✅ PostgreSQL integration works seamlessly

### 🧪 Testing Your Work

Test the following endpoints:

- `POST /transactions` - Create transactions linked to budgets
- `GET /transactions` - List all transactions with budget info
- `GET /transactions/:id` - Get specific transaction details
- `PUT /transactions/:id` - Update transaction information
- `DELETE /transactions/:id` - Remove transactions
- `GET /budgets/:id/transactions` - Get all transactions for a budget

---

## 🔴 Hard Level

> **Objective**: Implement JWT authentication and role-based authorization system

### 🎯 Your Mission

Create a secure authentication system with user roles and premium features.

### 👤 User Entity Structure

```typescript
{
  id: number;
  email: string; // Unique email address
  password: string; // Hashed password
  firstName: string;
  lastName: string;
  role: UserRole; // 'regular' | 'loyal_customer'
  createdAt: Date;
  updatedAt: Date;
}
```

### ✅ Tasks Checklist

#### 1. **User Management System**

- [ ] Create `src/users/users.module.ts`
- [ ] Create `src/users/users.service.ts`
- [ ] Create `src/users/users.controller.ts`
- [ ] Create `src/users/entities/user.entity.ts`
- [ ] Implement user CRUD operations

#### 2. **Authentication Module**

- [ ] Complete `src/auth/auth.module.ts`
- [ ] Complete `src/auth/auth.service.ts`
- [ ] Complete `src/auth/auth.controller.ts`
- [ ] Implement JWT strategy and guards

#### 3. **Security Implementation**

- [ ] Hash passwords using **bcrypt**
- [ ] Generate JWT tokens on login
- [ ] Create JWT authentication guard
- [ ] Implement refresh token functionality

#### 4. **Role-Based Authorization**

- [ ] Create `UserRole` enum: `regular` | `loyal_customer`
- [ ] Implement role-based guards
- [ ] Create "Loyal Card" purchase endpoint
- [ ] Restrict premium features to loyal customers

#### 5. **Protected Routes**

- [ ] Secure all budget and transaction endpoints
- [ ] Add user ownership validation
- [ ] Implement role-based access control

### 🎯 Success Criteria

- ✅ Users can register with secure password hashing
- ✅ Users can login and receive JWT tokens
- ✅ Protected routes require valid authentication
- ✅ Role-based access control works correctly
- ✅ Users can upgrade to loyal customer status
- ✅ Premium features are restricted appropriately

### 🧪 Testing Your Work

Authentication endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/purchase-loyal-card` - Upgrade to loyal customer

---

## 🎁 Premium Features

### 👑 Loyal Customer Exclusive Features

Once users purchase the "Loyal Card", they gain access to:

#### 📊 Advanced Analytics

- `GET /transactions/analytics/summary` - Detailed financial summaries
- `GET /transactions/analytics/trends` - Spending pattern analysis
- `GET /transactions/analytics/categories` - Category-wise breakdowns

#### 📁 Export Functionality (note just return plain success message.)

- `GET /transactions/export/csv` - Export transaction history
- `GET /budgets/export/pdf` - Generate budget reports

---

## 💡 Tips for Success

### 📖 Learning Strategy

1. **🚀 Start Simple** - Master the Easy level before advancing
2. **🧪 Test Frequently** - Use Postman Client after each implementation
3. **📚 Read Documentation** - NestJS and TypeORM docs are your best friends
4. **🎯 Follow Patterns** - Use existing code structure as your guide
5. **❓ Ask Questions** - Don't hesitate to seek help when stuck!

### 🛠️ Development Best Practices

- ✅ Use TypeScript strictly - enable all compiler checks
- ✅ Implement proper error handling and validation
- ✅ Write meaningful commit messages
- ✅ Test your endpoints thoroughly before moving on
- ✅ Keep your code clean and well-documented

### 🐛 Common Pitfalls to Avoid

- ❌ Don't skip DTOs - they're crucial for validation
- ❌ Don't hardcode database credentials
- ❌ Don't forget to hash passwords
- ❌ Don't ignore TypeORM relationship decorators
- ❌ Don't skip error handling in controllers

---

## 📚 Additional Resources

### 📖 Official Documentation

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

<div align="center">
  <h2>🎉 Ready to Build Something Amazing?</h2>
  <p>Start with the setup process and dive into the Easy level!</p>
  <p><strong>Good luck and happy coding! 🚀</strong></p>
</div>

---

<div align="center">
  <sub>Built with ❤️ for learning NestJS and modern backend development</sub>
</div>
