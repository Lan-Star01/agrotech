import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MockDataService } from './services/mock-data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'agrotech';

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.mockDataService.loadMockData();
  }
}
