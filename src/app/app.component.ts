import { Component} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedBunnyid: string | undefined;
  constructor(private store: AngularFirestore) { }

  ngOnInit(): void {
    this.selectedBunnyid =  undefined;  
  }
}

