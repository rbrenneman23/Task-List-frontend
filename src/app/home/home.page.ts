import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  incompleteTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  onDelete(taskId: number | undefined) {
    if (taskId !== undefined) {
      this.taskService.deleteTask(taskId.toString()).subscribe(
        () => this.loadTasks(),
        error => console.error('Error deleting task:', error)
      );
    } else {
      console.warn('Task ID is undefined');
    }
  }

  async newTask() {
    const title = await this.dialogService.showPrompt('Add Task', 'Enter the title of the new task:');
    if (title) {
      const newTask: Task = {
        title: title,
        completed: false
      };
      this.taskService.createTask(newTask).subscribe(() => this.loadTasks());
    }
  }

  toggleTaskCompletion(task: Task) {
    const updatedTask: Task = { ...task, completed: !task.completed };

    this.taskService.updateTask(updatedTask).subscribe(
      () => this.loadTasks(),
      error => console.error('Error updating task:', error)
    );
  }

  loadTasks() {
    this.taskService.getIncompleteTasks().subscribe(tasks => this.incompleteTasks = tasks);
    this.taskService.getCompletedTasks().subscribe(tasks => this.completedTasks = tasks);
  }
}