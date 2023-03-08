import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleSideNavService {

  constructor() { }

  showToggle: boolean = false;

  @Output() 
  onSideNavToggle = new EventEmitter<boolean>();

  onToggleclick() {
    this.showToggle = !this.showToggle;
    this.onSideNavToggle.emit(this.showToggle);
    // console.log(this.showToggle)
  }
}
