import { Component, Output, OnInit, EventEmitter, Input, OnChanges } from '@angular/core';
import { TaskService } from '../Services/task.service';
import { Task } from '../Task';
import {Observable} from 'rxjs'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges{

  showModel: boolean = true;
  @Input() currentComponent: string = "";
  @Output()
  closeModalEvent : EventEmitter<boolean> = new EventEmitter<boolean>();
  
  ngOnInit() {
    console.log(this.currentComponent);
  }

  ngOnChanges(): void {
    console.log(this.currentComponent);
  }

  constructor( private taskService : TaskService) {

  }

  // closeModal() {
  //   this.showModel = !this.showModel;
  // }

  onCrossBtnClick() {
    this.closeModalEvent.emit(false);
  }
  task: Task = {
    taskId: "",
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    status: ""
  };
  onTaskCreate(data: { title:string, description:string, priority:string, duedate: string}) {
    console.log(data);
    this.closeModalEvent.emit(false);
    this.task.title = data.title;
    this.task.description = data.description;
    this.task.priority = data.priority;
    this.task.dueDate = data.duedate;
    this.task.status = "incomplete";
    this.task.taskId = "0";

    // console.log(this.task);
    this.taskService.postTask(this.task).subscribe((res) => {
      this.ngOnInit();
    });

  }
}