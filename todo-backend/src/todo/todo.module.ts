import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Todo } from './entities/todo.entity';
import {TodoRepository} from './repo/todo.repositort'

@Module({
  imports :  [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
})
export class TodoModule {}
