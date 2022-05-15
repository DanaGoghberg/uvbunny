import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedBunnyid: string | undefined;

  ngOnInit(): void {
    this.selectedBunnyid =  undefined;  
  }
  onConfig(){}
}

