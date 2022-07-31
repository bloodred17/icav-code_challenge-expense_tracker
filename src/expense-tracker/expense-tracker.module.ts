import { Module } from '@nestjs/common';
import { ExpenseTrackerController } from './expense-tracker.controller';
import { ExpenseTrackerService } from './expense-tracker.service';

@Module({
  controllers: [ExpenseTrackerController],
  providers: [ExpenseTrackerService],
})
export class ExpenseTrackerModule {}
