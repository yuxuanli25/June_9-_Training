import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Task } from '../pipes/task-filter.pipe';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnChanges {
  
  @Input() task!: Task;
  @Output() taskUpdated = new EventEmitter<Task>();

  // Form fields for editing
  editMode: boolean = false;
  editForm: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: new Date(),
    status: '',
    priority: ''
  };

  // Available options for dropdowns
  statusOptions: string[] = ['Incomplete', 'In Progress', 'Completed'];
  priorityOptions: string[] = ['Low', 'Medium', 'High'];

  ngOnChanges(): void {
    if (this.task) {
      // Reset edit form when task changes
      this.resetEditForm();
      this.editMode = false;
    }
  }

  // Method to enter edit mode
  startEdit(): void {
    this.editMode = true;
    this.resetEditForm();
  }

  // Method to cancel editing
  cancelEdit(): void {
    this.editMode = false;
    this.resetEditForm();
  }

  // Method to save changes
  saveChanges(): void {
    if (this.isFormValid()) {
      // Emit the updated task to parent
      this.taskUpdated.emit({ ...this.editForm });
      this.editMode = false;
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // Reset edit form with current task values
  private resetEditForm(): void {
    this.editForm = {
      id: this.task.id,
      title: this.task.title,
      description: this.task.description,
      dueDate: new Date(this.task.dueDate),
      status: this.task.status,
      priority: this.task.priority
    };
  }

  // Form validation
  private isFormValid(): boolean {
    return !!(this.editForm.title.trim() && 
              this.editForm.description.trim() && 
              this.editForm.status && 
              this.editForm.priority);
  }

  // Helper method to format date for input field
  getFormattedDate(): string {
    return this.editForm.dueDate.toISOString().split('T')[0];
  }

  // Method to handle date change
  onDateChange(event: any): void {
    this.editForm.dueDate = new Date(event.target.value);
  }
}
