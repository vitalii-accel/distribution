import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OAuthField } from './OAuthField.schema';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop({ unique: true })
  kommoId: number;

  @Prop()
  domain: string;

  @Prop({ type: OAuthField })
  oauth: OAuthField;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
