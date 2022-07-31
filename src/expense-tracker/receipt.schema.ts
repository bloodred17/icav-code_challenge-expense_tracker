import { ApiProperty } from '@nestjs/swagger';
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Schema } from '../interfaces/Schema';

export enum ExpenseCategory {
  Entertainment = 'Entertainment',
  Transport = 'Transport',
  Groceries = 'Groceries',
  Shopping = 'Shopping',
  Other = 'Other',
}

@modelOptions({ schemaOptions: { collection: 'receipt' } })
export class Receipt extends Schema {
  @ApiProperty({
    description: 'Category of expense',
    enum: ExpenseCategory,
    enumName: 'ExpenseCategory',
    type: ExpenseCategory,
  })
  @IsEnum(ExpenseCategory)
  @IsNotEmpty()
  @prop({ enum: ExpenseCategory })
  category: ExpenseCategory;

  @ApiProperty({
    description: 'Reciept for',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @prop()
  title: string;

  @ApiProperty({
    description: 'Amount paid',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  @prop()
  cost: number;

  @IsDateString()
  @IsNotEmpty()
  @prop()
  time: string;

  static get model() {
    return getModelForClass(Receipt);
  }
}
