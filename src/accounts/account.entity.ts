import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OAuthField } from '../interfaces/oauth-field.interface';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kommoId: number;

  @Column()
  domain: string;

  get url(): string {
    return `https://${this.domain}`;
  }

  @Column({ type: 'json' })
  oauth: OAuthField;
}
