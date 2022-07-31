import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseTrackerService } from './expense-tracker.service';

describe('ExpenseTrackerService', () => {
  let service: ExpenseTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseTrackerService],
    }).compile();

    service = module.get<ExpenseTrackerService>(ExpenseTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
