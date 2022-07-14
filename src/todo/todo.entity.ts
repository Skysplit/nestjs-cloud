import { Tenant } from '@app/tenant/tenant.entity';
import { User } from '@app/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'todos' })
export class Todo {
  @ApiProperty({ minimum: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column()
  name!: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description!: string;

  @ApiProperty()
  @Column()
  completed!: boolean;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.todos)
  user!: User;

  @ManyToOne(() => Tenant)
  tenant!: Tenant;
}
