import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetTasksFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
    status: TaskStatus;
}