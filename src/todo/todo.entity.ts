import { User } from '@app/user/user.entity';
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ tableName: 'todos' })
export class Todo {
  @ApiProperty({ minimum: 1 })
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ApiProperty()
  @Property()
  name!: string;

  @ApiProperty()
  @Property({ type: 'text' })
  description!: string;

  @ApiProperty()
  @Property({ type: 'boolean' })
  completed!: boolean;

  @ApiProperty({ type: () => User })
  @ManyToOne({
    entity: () => User,
    onDelete: 'cascade',
    serializer(user: User) {
      return user;
    },
  })
  user!: User;
}
