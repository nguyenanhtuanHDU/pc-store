import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  @ViewChild("input") input!: ElementRef;

  constructor() {
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 300);
  }
}
