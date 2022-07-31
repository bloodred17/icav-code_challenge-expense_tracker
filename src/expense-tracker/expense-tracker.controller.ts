import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ReceiptDto } from './receipt.dto';
import { Receipt } from './receipt.schema';

@Controller('expense-tracker')
export class ExpenseTrackerController {
  @Post()
  async getReceipt(
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    )
    query: ReceiptDto,
  ) {
    try {
      return {
        error: false,
        // data: query,
        data: await Receipt.model.create(query),
      };
    } catch (e) {
      return {
        error: true,
        data: e?.message,
      };
    }
  }
}
