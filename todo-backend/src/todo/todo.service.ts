import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UserService } from 'src/user/user.service';
import { UpdateTodoDto } from './dto/update-todo.dto';


@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>, //  direct TypeORM repo
    private readonly userService: UserService,
  ) {}

  // Create a new todo
  async create(createTodoDto: CreateTodoDto, userId: number) {
    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toISOString();
    todo.completed = false;
    todo.user = await this.userService.findUserById(userId);

    return this.todoRepo.save(todo);
  }

  // Get all incomplete todos for a user
  findnotcompletedtodo(userId: number) {
    return this.todoRepo.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  // Get all completed todos for a user
  findCompletedtodo(userId: number) {
    return this.todoRepo.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }

  // Get all not completed todos for a user
  findNotCompleted(userId: number) {
    return this.todoRepo.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  async update(todoId: number, updateTodoDto: UpdateTodoDto) {
  const todo = await this.todoRepo.findOne({ where: { id: todoId } });
  if (!todo) throw new NotFoundException('Todo not found');

  if (updateTodoDto.title !== undefined) {
    todo.title = updateTodoDto.title;
  }
  if (updateTodoDto.completed !== undefined) {
    todo.completed = updateTodoDto.completed;
  }

  return this.todoRepo.save(todo);
}


  // Delete a todo by id
  async remove(todoId: number) {
    const result = await this.todoRepo.delete(todoId);
    if (result.affected === 0) throw new NotFoundException('Todo not found');
    return { message: 'Todo removed successfully' };
  }

  // Mark a todo as completed
  async markCompleted(todoId: number) {
    const todo = await this.todoRepo.findOne({ where: { id: todoId } });
    if (!todo) throw new NotFoundException('Todo not found');

    todo.completed = true;
    return this.todoRepo.save(todo);
  }
}
