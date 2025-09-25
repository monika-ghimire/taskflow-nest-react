import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
@Controller('todo')
@ApiTags('Todos')
@ApiSecurity('JWT-auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  // Create todo for a user
  @Post(':userId')
  create(@Param('userId') userId: string, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto, +userId);
  }

  // Get all incomplete todos for a user
  @Get('/findAllNotCompleted/:userId')
  findAll(@Param('userId') userId: string) {
    console.log(userId)
    return this.todoService.findnotcompletedtodo(+userId);
  }

  // Get completed todos
  @Get('/findAllCompleted/:userId')
  findCompleted(@Param('userId') userId: string) {
    return this.todoService.findCompletedtodo(+userId);
  }
  

  // // Get not completed todos
  // @Get(':userId/not-completed')
  // findNotCompleted(@Param('userId') userId: string) {
  //   return this.todoService.findNotCompleted(+userId);
  // }

  @Patch(':todoId')
  update(@Param('todoId') todoId: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+todoId, updateTodoDto);
  }

  // Mark todo as completed
  @Patch(':todoId/complete')
  markCompleted(@Param('todoId') todoId: string) {
    return this.todoService.markCompleted(+todoId);
  }

  // Delete todo
  @Delete(':todoId')
  remove(@Param('todoId') todoId: string) {
    return this.todoService.remove(+todoId);
  }
}
