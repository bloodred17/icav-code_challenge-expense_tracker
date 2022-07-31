import { Module } from '@nestjs/common';
import { ExpenseTrackerController } from './expense-tracker.controller';

@Module({
  controllers: [ExpenseTrackerController],
})
export class ExpenseTrackerModule {}
