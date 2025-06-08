import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('transactions/export')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TransactionsExportController {

    @Get('csv')
    @Roles(UserRole.LOYAL_CUSTOMER)
    exportCsv() {
        // Implement actual export logic or just return success message
        return { message: 'Transaction history exported as CSV (mock)' };
    }
}

@Controller('budgets/export')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BudgetsExportController {

    @Get('pdf')
    @Roles(UserRole.LOYAL_CUSTOMER)
    exportPdf() {
        // Implement actual export logic or just return success message
        return { message: 'Budget report generated as PDF (mock)' };
    }
}

