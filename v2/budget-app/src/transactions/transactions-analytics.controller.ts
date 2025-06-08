import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('transactions/analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TransactionsAnalyticsController {

    @Get('summary')
    @Roles(UserRole.LOYAL_CUSTOMER)
    getSummary() {
        return { message: 'Detailed financial summaries' };
    }

    @Get('trends')
    @Roles(UserRole.LOYAL_CUSTOMER)
    getTrends() {
        return { message: 'Spending pattern analysis' };
    }

    @Get('categories')
    @Roles(UserRole.LOYAL_CUSTOMER)
    getCategories() {
        return { message: 'Category-wise breakdowns' };
    }
}
