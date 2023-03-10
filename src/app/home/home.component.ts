import { Component, OnInit } from '@angular/core';
import { TaskService } from '../Services/task.service';
import { Task } from '../Task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  date = new Date();
  time: number =  this.date.getHours();
  greet: string = "";
  noOfTaskAssigned: number = 0;
  noOfTaskCompleted: number = 0;
  showModel: boolean = false;
  taskItems: Task[] = [];
  completedTask: Task[] = [];
  timePeriod: string = "thisweek"
  component: string = "home";
  
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    // logic for greet
    if(this.time >= 0 && this.time < 12) {
      this.greet = "Good Morning";
    } else if (this.time >= 12 && this.time < 16){
      this.greet = "Good Afternoon";
    } else if(this.time>=16 && this.time < 24) {
      this.greet = "Good Evening";
    }

    this.taskService.getTask().subscribe(response => {
      this.completedTask = response.filter(ele => {
        return ele.status === 'complete';
      })
      this.noOfTaskAssigned = response.length;
      this.taskItems = response.filter(ele => {
        let date = new Date(ele.dueDate);
        let curr_date = new Date();
        let check1 = false;
        if(date.getFullYear() === curr_date.getFullYear()) {
          if(date.getMonth() === curr_date.getMonth()) {
            check1 = true;
          }
        }
        return (check1 && ((date.getDate() - curr_date.getDate() <= 3)) && ele.priority==='high');
      });
      this.noOfTaskCompleted = this.completedTask.length;
    })
  }

  showModelfunc() {
    this.showModel = !this.showModel;
  }

  onCrossBtnClicked(data: boolean) {
    console.log(data);
    this.showModel = data;
  }
  timePeriodSelected(value: string) {
    this.timePeriod = value;
  }
  onIconClick(task: Task) {
    if(task.status === 'incomplete') {
      this.noOfTaskCompleted = this.noOfTaskCompleted - 1;
    } else {
      this.noOfTaskCompleted = this.noOfTaskCompleted + 1;
    }
  }
}