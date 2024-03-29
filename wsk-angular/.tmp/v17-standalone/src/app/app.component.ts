import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AngularLibraryModule } from 'angular-library';

@Component({
  selector: 'app-root',
  standalone: true,
  // standalone: false,
  imports: [CommonModule, RouterOutlet, AngularLibraryModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wsk-app-v17-standalone';
  
  first = 'Web';
  middle = 'Starter';
  last = 'Kit';
}
