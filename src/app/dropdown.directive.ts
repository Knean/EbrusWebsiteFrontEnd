import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show')  dropped = false
  //dropped = false
 
  @HostListener('click') dropToggle(){
    this.dropped = true
  }
  
}
