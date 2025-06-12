import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverbackground]',
  standalone:false
})
export class HoverbackgroundDirective {



  constructor(private el: ElementRef, private renderer: Renderer2) { 
  }

  @HostListener('mouseenter')
  onMouse(){
    this.renderer.setStyle(this.el.nativeElement,'background-color','green') 
  }
    @HostListener('mouseleave')
  onLeave(){
    this.renderer.setStyle(this.el.nativeElement,'background-color','yellow') 
  }

}
