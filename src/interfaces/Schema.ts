import { mongoose } from '@typegoose/typegoose';
import { ISchema } from './schema.interface';

export class Schema implements ISchema {
  _id?: mongoose.Types.ObjectId;
  __v?: number;
  __t?: undefined | string | number;
}
