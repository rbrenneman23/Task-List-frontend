import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseURL: string = "http://localhost:5256/api/task";

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseURL}`);
  }

  getCompletedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseURL}/completed`);
  }

  getIncompleteTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseURL}/incomplete`);
  }

  createTask(newTask: Task): Observable<any> {
    return this.http.post(this.baseURL, newTask);
  } 

  editTask(taskId: string, editedTask: Task): Observable<any> {
    return this.http.put(`${this.baseURL}/${editedTask.taskId}`, editedTask);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${taskId}`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseURL}/${task.taskId}`, task);
  }
}