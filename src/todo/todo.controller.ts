import { JwtGuard } from '@app/auth/guards/jwt.guard';
import { CurrentUser } from '@app/common/current-user.decorator';
import { User } from '@app/user/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { TodoDto } from './todo.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todos')
@UseGuards(JwtGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  list(@CurrentUser() user: User) {
    return this.todoService.findAllFor(user);
  }

  @Post()
  async create(@CurrentUser() user: User, @Body() todo: TodoDto) {
    return await this.todoService.createFor(todo, user);
  }

  @Put(':id')
  async update(
    @CurrentUser() user: User,
    @Body() todo: TodoDto,
    @Param('id', new ParseIntPipe()) id: Todo['id'],
  ) {
    return this.todoService.updateFor(id, todo, user);
  }

  @Delete(':id')
  async delete(
    @CurrentUser() user: User,
    @Param('id', new ParseIntPipe()) id: Todo['id'],
  ) {
    return this.todoService.deleteFor(id, user);
  }
}
