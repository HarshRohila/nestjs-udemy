import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //     return this.taskService.getTasks( filterDto );
    // }

    @Get(':id')
    getTaskById( @Param('id', ParseIntPipe) id: number ): Promise<Task> {
        return this.taskService.getTaskById( id );
    }

    // @Delete(':id')
    // deleteTaskById( @Param('id') id: string ): Task {
    //     return this.taskService.deleteTaskById( id );
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask( @Body() createTaskDto: CreateTaskDto ): Task {
    //     return this.taskService.createTask( createTaskDto );
    // }
    
    // @Patch(':id/status')
    // updateStatus( 
    //     @Param('id') id: string, 
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus 
    // ) : Task {
    //     return this.taskService.updateStatus( id, status );
    // }
}
