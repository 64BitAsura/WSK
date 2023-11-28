import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wsk-app';
  
  first = 'Web';
  middle = 'Starter';
  last = 'Kit';
}
