import { HydratedDocument } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

export type OAuthFieldDocument = HydratedDocument<OAuthField>;

@Schema()
export class OAuthField {
  @Prop()
  accessToken: string;
  @Prop()
  refreshToken: string;
  @Prop()
  expire: number;
}
