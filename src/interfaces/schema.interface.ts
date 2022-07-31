import { mongoose } from '@typegoose/typegoose';

export interface ISchema {
  _id?: mongoose.Types.ObjectId;
  __v?: number;
  __t?: undefined | string | number;
}
