import { Module } from '@nestjs/common';
import { mongoose } from '@typegoose/typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseTrackerModule } from './expense-tracker/expense-tracker.module';

@Module({
  imports: [ExpenseTrackerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    mongoose.connect(
      process.env.MONGODB || 'mongodb://localhost:27017/expense-tracker',
    );
  }
}
