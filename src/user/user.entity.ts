import { Todo } from '@app/todo/todo.entity';
import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ autoincrement: true })
  id!: number;

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
