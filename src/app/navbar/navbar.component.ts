import { Component } from '@angular/core';
import { ToggleSideNavService } from '../Services/toggle-side-nav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private sideNavService: ToggleSideNavService) {}

  toggleSideNav() {
    this.sideNavService.onToggleclick();
  }
}
