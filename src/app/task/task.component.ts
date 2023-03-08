import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TaskService } from '../Services/task.service';
import { Task } from '../Task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{

  @Input() item: Task = {
      taskId: "1",
      title: "Title of task",
      description: "Description of task",
      priority: "low",
      dueDate: "02/02/2020",
      status: "complete"
  }
  @Output() onCompleteClickEvent = new EventEmitter<Task>();

  ngOnInit(): void {
    
  }
  constructor(private taskService: TaskService, private router: Router) {}

  priorityIcons : {[key: string] : string} = {
    'high': 'up',
    "medium": "right",
    "low": "down"
  }

  completeToggle() {
    this.item.status = this.item.status == 'complete'? 'incomplete' : 'complete';
    this.taskService.putTask(this.item).subscribe((response) => {
    });
    // this.router.navigate(['/home']);
    this.onCompleteClickEvent.emit(this.item);
    // this.router.navigate(['/mytasks']);
    let curr_url = this.router.url;
    // console.log(curr_url);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([curr_url]);
  });
  }
}
