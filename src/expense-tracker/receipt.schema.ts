import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { model } from 'mongoose';
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
  @IsEnum(ExpenseCategory)
  @IsNotEmpty()
  @prop({ enum: ExpenseCategory })
  category: ExpenseCategory;

  @IsString()
  @IsNotEmpty()
  @prop()
  title: string;

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
