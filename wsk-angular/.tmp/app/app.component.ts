import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularLibraryModule } from 'angular-library';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [CommonModule, RouterOutlet],
  imports: [CommonModule, AngularLibraryModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wsk-app';
  
  first = 'Web';
  middle = 'Starter';
  last = 'Kit';
}
