import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
       @InjectRepository(TaskRepository)
       private taskRepository: TaskRepository,
    ) {}
    getTasks( filterDto: GetTasksFilterDto ): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return found;
    }

    async deleteTaskById( id: number ): Promise<Task> {
        const task = await this.getTaskById( id );
        await this.taskRepository.delete(task);

        return task;
    }

    createTask( createTaskDto: CreateTaskDto ): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async updateStatus( id: number, status: TaskStatus ): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();

        return task;
    }
}
