import { TenantService } from '@app/tenant/tenant.service';
import { User } from '@app/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TodoDto } from './todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    private readonly tenantService: TenantService,
  ) {}

  async findOrFailFor(id: Todo['id'], user: User) {
    return await this.todoRepository.findOneOrFail({
      where: {
        id,
        user,
        tenant: await this.tenantService.findCurrent(),
      },
    });
  }

  async findAllFor(user: User) {
    return await this.todoRepository.find({
      where: {
        user,
        tenant: await this.tenantService.findCurrent(),
      },
      order: {
        id: 'desc',
      },
    });
  }

  async createFor(todoParams: TodoDto, user: User) {
    const todo = this.todoRepository.create({
      ...todoParams,
      user,
      tenant: await this.tenantService.findCurrent(),
    });

    return await this.todoRepository.save(todo);
  }

  async updateFor(id: Todo['id'], todoParams: TodoDto, user: User) {
    const todo = await this.findOrFailFor(id, user);
    const updatedTodo = this.todoRepository.merge(todo, todoParams);

    await this.todoRepository.save(updatedTodo);

    return todo;
  }

  async deleteFor(id: Todo['id'], user: User) {
    const todo = await this.findOrFailFor(id, user);

    await this.todoRepository.delete(todo);

    return todo;
  }
}
