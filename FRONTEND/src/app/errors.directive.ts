import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appErrors]'
})
export class ErrorsDirective {

  //@Input() appErrors : boolean =false;
  private el : ElementRef;

  constructor(el: ElementRef) { 
    this.el =el;
  }

  @HostListener('change') onChange(){
    this.el.nativeElement.style.backgroundColor = this.el.nativeElement.checkValidity() ? null: 'red';
  }

}
