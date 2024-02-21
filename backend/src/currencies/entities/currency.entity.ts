import { CurrencyType } from 'src/_utils/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryColumn()
  id: number;

  @Column()
  name: CurrencyType;
}
