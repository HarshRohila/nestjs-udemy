import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
       @InjectRepository(TaskRepository)
       private taskRepository: TaskRepository,
    ) {}
    getTasks( filterDto: GetTasksFilterDto, user: User ): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne( { where: { id, userId: user.id } } );

        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return found;
    }

    async deleteTaskById( id: number, user: User ): Promise<Task> {
        const task = await this.getTaskById( id, user );
        await this.taskRepository.delete(task);

        return task;
    }

    createTask( createTaskDto: CreateTaskDto, user: User ): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async updateStatus( id: number, status: TaskStatus, user: User ): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();

        return task;
    }
}
