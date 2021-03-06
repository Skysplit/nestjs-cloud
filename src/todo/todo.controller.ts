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
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';

import { TodoDto } from './todo.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todos')
@UseGuards(JwtGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@ApiBearerAuth()
export class TodoController {
  constructor(private todoService: TodoService) {}

  @ApiResponse({ type: () => Todo, isArray: true })
  @Get()
  list(@CurrentUser() user: User) {
    return this.todoService.findAllFor(user);
  }

  @ApiResponse({ type: () => Todo })
  @Post()
  async create(@CurrentUser() user: User, @Body() todo: TodoDto) {
    return await this.todoService.createFor(todo, user);
  }

  @ApiParam({ name: 'id', description: 'Todo item id', type: 'number' })
  @ApiResponse({ type: () => Todo })
  @Put(':id')
  async update(
    @CurrentUser() user: User,
    @Body() todo: TodoDto,
    @Param('id', new ParseIntPipe()) id: Todo['id'],
  ) {
    return this.todoService.updateFor(id, todo, user);
  }

  @ApiParam({ name: 'id', description: 'Todo item id', type: 'number' })
  @ApiResponse({ type: () => Todo })
  @Delete(':id')
  async delete(
    @CurrentUser() user: User,
    @Param('id', new ParseIntPipe()) id: Todo['id'],
  ) {
    return this.todoService.deleteFor(id, user);
  }
}
