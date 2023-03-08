import { Component , OnChanges, OnInit} from '@angular/core';
import { TaskService } from './Services/task.service';
import { ToggleSideNavService } from './Services/toggle-side-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'KaryaSiddhi';
  showToggle : boolean = false;
  showModel: boolean = false;

  constructor(private taskService: TaskService, private sideNavService: ToggleSideNavService) { }
  
  ngOnInit() {
    this.sideNavService.onSideNavToggle.subscribe(res => {
      console.log(res);
      this.showToggle = res;
    });
  }
}
