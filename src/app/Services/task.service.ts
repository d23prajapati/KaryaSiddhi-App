import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = "https://localhost:7219/api/Task";

  constructor(private httpClient : HttpClient) { }

  postTask(task : Task) {
    return this.httpClient.post(this.url, task);
  }

  getTask() {
    return this.httpClient.get<Task[]>(this.url);
  }

  putTask(task: Task) {
    return this.httpClient.put<Task>(this.url, task);
  }
}
