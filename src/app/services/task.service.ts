import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/tasks/';
  }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addTask(tarea: Task): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, tarea);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateTask(id: number, tarea: Task): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, tarea);
  }
}
