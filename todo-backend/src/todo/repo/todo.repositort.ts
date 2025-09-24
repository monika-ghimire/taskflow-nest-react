// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Todo } from '../entities/todo.entity';

// @Injectable()
// export class TodoRepository {
//   constructor(
//     @InjectRepository(Todo)
//     private readonly repo: Repository<Todo>,
//   ) {}

//   async save(todo: Todo): Promise<Todo> {
//     return this.repo.save(todo);
//   }

//   async findAll(options?: any): Promise<Todo[]> {
//   return this.repo.find(options);
// }

//   async findById(id: number): Promise<Todo | null> {
//     return this.repo.findOne({ where: { id } });
//   }

//   async deleteById(id: number): Promise<void> {
//     await this.repo.delete(id);
//   }

//   async findByUserId(userId: number): Promise<Todo[]> {
//     return this.repo.find({
//       where: { user: { id: userId } },
//       relations: ['user'],
//     });
//   }

//   async findCompleted(userId: number): Promise<Todo[]> {
//     return this.repo.find({
//       where: { user: { id: userId }, completed: true },
//       relations: ['user'],
//     });
//   }

//   async findNotCompleted(userId: number): Promise<Todo[]> {
//     return this.repo.find({
//       where: { user: { id: userId }, completed: false },
//       relations: ['user'],
//     });
//   }
// }
