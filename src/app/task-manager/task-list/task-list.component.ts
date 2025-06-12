import { Component } from '@angular/core';
import { Task } from '../pipes/task-filter.pipe';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  
  selectedStatus: string = 'All';
  selectedTaskId: number | null = null;

  // Available status options for filtering
  statusOptions: string[] = ['All', 'Incomplete', 'In Progress', 'Completed'];

  // Task data copied from todolist component
  tasks: Task[] = [
    {
      id: 1,
      title: "Design Homepage Layout",
      description: "Create wireframes and a mockup for the new homepage layout.",
      dueDate: new Date("2024-08-20"),
      status: "Incomplete",
      priority: "High",
    },
    {
      id: 2,
      title: "Update User Profile Feature",
      description: "Enhance the user profile page with new fields and validation.",
      dueDate: new Date("2024-08-15"),
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Fix Bugs in Task Management Module",
      description: "Resolve the bugs reported in the task management module.",
      dueDate: new Date("2024-08-10"),
      status: "Completed",
      priority: "High",
    },
    {
      id: 4,
      title: "Develop Notification System",
      description: "Implement a notification system for task updates.",
      dueDate: new Date("2024-08-18"),
      status: "Incomplete",
      priority: "Low",
    },
    {
      id: 5,
      title: "Code Review for Authentication Module",
      description: "Conduct a code review for the recently developed authentication module.",
      dueDate: new Date("2024-08-12"),
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: 6,
      title: "Prepare Sprint Review Presentation",
      description: "Compile a presentation for the upcoming sprint review meeting.",
      dueDate: new Date("2024-08-17"),
      status: "Incomplete",
      priority: "High",
    },
    {
      id: 7,
      title: "Write Unit Tests for API Endpoints",
      description: "Write and run unit tests for the newly created API endpoints.",
      dueDate: new Date("2024-08-13"),
      status: "Completed",
      priority: "Medium",
    },
    {
      id: 8,
      title: "Optimize Database Queries",
      description: "Improve the performance of the database queries used in the reporting module.",
      dueDate: new Date("2024-08-25"),
      status: "Incomplete",
      priority: "High",
    }
  ];

  // Method to handle task selection for editing
  selectTask(taskId: number): void {
    this.selectedTaskId = taskId;
  }

  // Method to get selected task object
  getSelectedTask(): Task | undefined {
    return this.tasks.find(task => task.id === this.selectedTaskId);
  }

  // Method to handle task updates from child component
  onTaskUpdated(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask };
    }
    // Optionally close the detail view after update
    this.selectedTaskId = null;
  }

  // Method to close task detail view
  closeTaskDetail(): void {
    this.selectedTaskId = null;
  }

  // Method to change status filter
  onStatusFilterChange(status: string): void {
    this.selectedStatus = status;
  }
}
