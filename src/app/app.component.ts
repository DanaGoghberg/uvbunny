import { Component, ViewChild } from '@angular/core';
import { ConfigurationComponent } from './configuration/configuration.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(ConfigurationComponent) config: ConfigurationComponent | undefined;
  onConfig(){}
}

