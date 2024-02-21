import { CurrencyType } from 'src/_utils/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryColumn()
  id: number;

  @Column()
  user: number;

  @Column()
  currency: CurrencyType;

  @Column()
  amount: number;

  @Column()
  title: string;

  @Column()
  uin: number;
}
