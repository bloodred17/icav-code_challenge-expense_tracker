import {
  Body,
  Controller,
  Get,
  Post,
  StreamableFile,
  Req,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { createReadStream } from 'fs';
import path from 'path';
import { ExpenseTrackerService } from './expense-tracker.service';
import { ReceiptDto } from './receipt.dto';
import { Receipt } from './receipt.schema';

@Controller('expense-tracker')
export class ExpenseTrackerController {
  constructor(private readonly expTracker: ExpenseTrackerService) {}

  @ApiTags('Receipt')
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

  @ApiTags('Receipt')
  @Get(['/', ':/id'])
  async getReceipts(@Param('id') id: string) {
    try {
      const filter = id ? { _id: id } : {};
      return {
        error: false,
        data: await this.expTracker.getReceipts(filter),
      };
    } catch (e) {
      return {
        error: true,
        data: e?.message,
      };
    }
  }

  @ApiTags('Report')
  @Get(['/total-percentage', '/category-percentage'])
  async getReports(@Req() req: any) {
    try {
      const param = req?.url?.split('/')?.at(-1);
      let filename: string;
      switch (param) {
        case 'total-percentage':
          filename = await this.expTracker.getTotalCostCsv({
            startDate: new Date('2022-07-01'),
            endDate: new Date('2022-07-30'),
          });
          break;

        case 'category-percentage':
          filename = await this.expTracker.getPercentageByCategory();
          break;

        default:
          throw new Error('Invalid param');
      }

      const file = createReadStream(
        path.join(process.cwd(), './temp/' + filename + '.csv'),
      );
      return new StreamableFile(file);
      // return 'hello';
    } catch (e) {
      console.error(e);
      return {
        error: true,
        data: e?.message,
      };
    }
  }
}
