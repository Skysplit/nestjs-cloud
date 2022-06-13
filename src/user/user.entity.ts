import { Todo } from '@app/todo/todo.entity';
import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ tableName: 'users' })
export class User {
  @ApiProperty({ minimum: 1 })
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ApiProperty()
  @Property({ unique: true })
  email!: string;

  @Property({ unique: true, hidden: true })
  externalId!: string;

  @OneToMany({
    entity: () => Todo,
    mappedBy: 'user',
  })
  todos = new Collection<Todo>(this);
}
