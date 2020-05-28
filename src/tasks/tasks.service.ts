import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
       @InjectRepository(TaskRepository)
       private taskRepository: TaskRepository,
    ) {}
    // getTasks( filterDto: GetTasksFilterDto ): Task[] {
    //     if (Object.keys( filterDto ).length) {
    //         const { status, search } = filterDto;
    //         if ( status ) {
    //             return this.tasks.filter( task => task.status === status );
    //         }

    //         if ( search ) {
    //             return this.tasks.filter( task => {
    //                 return task.title.includes( search) ||
    //                     task.description.includes( search );
    //             });
    //         }
    //     }

    //     return this.tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return found;
    }

    // deleteTaskById( id: string ): Task {
    //     const task = this.getTaskById( id );
    //     this.tasks = this.tasks.filter( task => task.id !== id );

    //     return task;
    // }

    // createTask( createTaskDto: CreateTaskDto ): Task {
    //     const { title, description } = createTaskDto;

    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     }

    //     this.tasks = [...this.tasks, task];

    //     return task;
    // }

    // updateStatus( id: string, status: TaskStatus ): Task {
    //     let updatedTask = null;

    //     this.tasks = this.tasks.map( task => {
    //         if ( task.id === id ) {
    //             updatedTask = task = { ...task, status };
    //         }

    //         return task;
    //     });

    //     if (updatedTask === null) {
    //         throw new NotFoundException(`Task with id ${id} not found`);
    //     }

    //     return updatedTask;
    // }
}
