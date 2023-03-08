import {Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy} from '@angular/core';
import { TaskService } from '../Services/task.service';
import { Task } from '../Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnChanges {

  @Input() taskItems : Task[] = [];
  @Input() timePeriod: string = "thisweek";
  @Input() taskListAll: Task[] = [];
  @Input() taskStatus: string = "incompletetask";
  @Input() component: string = "home";
  date = new Date();
  thisWeekTasks: Task[] = [];
  thisMonthTasks: Task[] = [];
  tomorrowTasks: Task[] = [];
  taskList: Task[] = [];
  completedTasks: Task[] = [];
  incompleteTasks: Task[] = [];
  @Output() onSelectIconEvent = new EventEmitter<Task>(); 

  constructor(private taskService : TaskService) {}

  ngOnInit() {
    
  }
  
  ngOnChanges(){

    this.thisWeekTasks = this.taskItems.filter(task => {
      let date = new Date(task.dueDate);
      let curr_date = new Date();
      return this.isSameWeek(date, curr_date);
    })
    
    this.thisMonthTasks = this.taskItems.filter(task => {
      let date = new Date(task.dueDate);
      let curr_date = new Date();
      return this.isSameMonth(date, curr_date);
    })

    this.tomorrowTasks = this.taskItems.filter(task => {
      let date = new Date(task.dueDate);
      let curr_date = new Date();
      return ((date.getDate() - curr_date.getDate()===1) && (date.getMonth() === curr_date.getMonth()));
    })

    this.completedTasks = this.taskListAll.filter(task => {
      return task.status === 'complete';
    })
    // console.log(this.completedTasks)
    this.incompleteTasks = this.taskListAll.filter(task => {
      return task.status === 'incomplete';
    })

    if(this.component === 'home'){
      if(this.timePeriod === 'thisweek') {
        this.taskList = this.thisWeekTasks;
      } else if(this.timePeriod === 'thismonth') {
        this.taskList = this.thisMonthTasks;
      } else if(this.timePeriod === 'tomorrow') {
        this.taskList = this.tomorrowTasks;
      } else {
        this.taskList = this.taskItems;
      }
    } else if(this.component === 'mytask'){
      if(this.taskStatus === 'incompletetask'){
        this.taskList = this.incompleteTasks;
      } else if(this.taskStatus === 'completetask') {
        this.taskList = this.completedTasks;
      }
    }

  }

  // Utility functions

  isSameWeek(date1: Date, date2: Date) {
    if(this.weekOfYear(date1) === this.weekOfYear(date2)){
      return true;
    }
    return false;
  }

  isSameMonth(date1: Date, date2: Date) {
    let month1 = date1.getMonth();
    let month2 = date2.getMonth();
    return month1 === month2;
  }

  weekOfYear(date: Date){
    let startDate = new Date(date.getFullYear(), 0, 1);
    var days = Math.floor((date.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000));      
    var weekNumber = Math.ceil(days / 7);
    return weekNumber;
  }

  onSelectButton(task: Task) {
    this.onSelectIconEvent.emit(task);
  }
}
