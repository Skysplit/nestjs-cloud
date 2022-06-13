import { User } from '@app/user/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { TodoDto } from './todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: EntityRepository<Todo>,
  ) {}

  async findOrFailFor(id: Todo['id'], user: User) {
    return await this.todoRepository.findOneOrFail({ id, user });
  }

  async findAllFor(user: User) {
    return await this.todoRepository.find({ user });
  }

  async createFor(todoParams: TodoDto, user: User) {
    const todo = this.todoRepository.create({
      ...todoParams,
      user,
    });

    await this.todoRepository.persistAndFlush(todo);

    return todo;
  }

  async updateFor(id: Todo['id'], todoParams: TodoDto, user: User) {
    const todo = await this.findOrFailFor(id, user);

    this.todoRepository.assign(todo, todoParams);

    this.todoRepository.persistAndFlush(todo);

    return todo;
  }

  async deleteFor(id: Todo['id'], user: User) {
    const todo = await this.findOrFailFor(id, user);

    this.todoRepository.removeAndFlush(todo);

    return todo;
  }
}
