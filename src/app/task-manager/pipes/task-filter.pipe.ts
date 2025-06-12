import { Pipe, PipeTransform } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  priority: string;
}

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(tasks: Task[], selectedStatus: string): Task[] {
    if (!tasks || !selectedStatus || selectedStatus === 'All') {
      return tasks;
    }
    
    return tasks.filter(task => task.status === selectedStatus);
  }
}
