import { User } from '@app/user/user.entity';
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'todos' })
export class Todo {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  name!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'boolean' })
  completed!: boolean;

  @ManyToOne({
    entity: () => User,
    onDelete: 'cascade',
    serializer(user: User) {
      return user;
    },
  })
  user!: User;
}
