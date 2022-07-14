import { Todo } from '@app/todo/todo.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ minimum: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column()
  @Index()
  email!: string;

  @Column({ unique: true })
  externalId!: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos!: Todo[];
}
