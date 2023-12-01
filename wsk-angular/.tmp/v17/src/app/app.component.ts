import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // standalone: true,
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wsk-app-v17';
  
  first = 'Web';
  middle = 'Starter';
  last = 'Kit';
}
