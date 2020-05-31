import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskService.getTasks( filterDto );
    }

    @Get(':id')
    getTaskById( @Param('id', ParseIntPipe) id: number ): Promise<Task> {
        return this.taskService.getTaskById( id );
    }

    @Delete(':id')
    deleteTaskById( @Param('id', ParseIntPipe) id: number ): Promise<Task> {
        return this.taskService.deleteTaskById( id );
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask( 
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        return this.taskService.createTask( createTaskDto, user );
    }
    
    @Patch(':id/status')
    updateStatus( 
        @Param('id', ParseIntPipe) id: number, 
        @Body('status', TaskStatusValidationPipe) status: TaskStatus 
    ) : Promise<Task> {
        return this.taskService.updateStatus( id, status );
    }
}
