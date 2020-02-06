import { Component } from '@angular/core';
import { ConfigService } from './service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hooks';
  loaded = false;

  constructor(
    private config: ConfigService,
  ) {
    this.config.settings$.subscribe(
      settings => this.loaded = settings
    )
  }
}
