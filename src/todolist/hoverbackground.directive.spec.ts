import { ElementRef, Renderer2 } from '@angular/core';
import { HoverbackgroundDirective } from './hoverbackground.directive';

describe('HoverbackgroundDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') };
    const mockRenderer = jasmine.createSpyObj('Renderer2', ['setStyle']);
    
    const directive = new HoverbackgroundDirective(mockElementRef as ElementRef, mockRenderer);
    expect(directive).toBeTruthy();
  });
});