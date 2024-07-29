import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListTasksComponent } from "./components/list-tasks/list-tasks.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListTasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app-sophos';
}
