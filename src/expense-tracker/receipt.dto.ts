import { Exclude } from 'class-transformer';
import { Receipt } from './receipt.schema';

export class ReceiptDto extends Receipt {
  @Exclude({ toClassOnly: true })
  time: string = new Date()?.toISOString();
}
