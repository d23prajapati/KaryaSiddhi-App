import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../Services/task.service';
import { Task } from '../Task';

@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.component.html',
  styleUrls: ['./mytasks.component.css']
})
export class MytasksComponent implements OnInit, OnChanges {

  showModel : boolean = false;
  taskStatus: string = 'incompletetask';
  taskItems2: Task[] = [];
  component: string = "mytask";
  todaysTasks: Task[] = [];
  laterTasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) {

  }
  
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit(): void {
     this.getTask();
  }
  openModel() {
    this.showModel = true;
    // console.log(this.todaysTasks);
  }

  onCrossBtnClick(data : boolean) {
    this.showModel = false;
    this.ngOnInit();
  }
  onTimePeriodSelected(value: string) {
    this.taskStatus = value;
  }

  onIconClicked(task : Task) {
    // console.log(task);
    // this.ngOnInit();
    // this.router.navigate(['/mytasks']);
  }

  getTask() {
    this.taskService.getTask().subscribe(task => {
      this.taskItems2 = task.filter(ele => {
        let date = new Date(ele.dueDate);
        let curr_date = new Date();
        let check1 = false;
        if(date.getFullYear() === curr_date.getFullYear()) {
          if(date.getMonth() === curr_date.getMonth()) {
            check1 = true;
          }
        }
        return (check1 && (Math.abs(date.getDate() - curr_date.getDate()) <= 3) && ele.priority==='high');
      });
      this.taskItems2 = this.taskItems2.splice(0,3);
      // console.log(this.taskItems2)
      this.todaysTasks = task.filter(ele => {
        let date = new Date(ele.dueDate);
        // console.log(date)
        let curr_date = new Date();
        // console.log(curr_date)
        return date.getDate() === curr_date.getDate();
      })
      this.laterTasks = task.filter(ele => {
        let date = new Date(ele.dueDate);
        // console.log(date)
        let curr_date = new Date();
        // console.log(curr_date)
        return date.getDate() !== curr_date.getDate();
      })
    });
  }
}