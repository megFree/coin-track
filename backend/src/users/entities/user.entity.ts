import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({
    generated: true,
    nullable: false,
    primary: true,
    name: 'id',
  })
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
