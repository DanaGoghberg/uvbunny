import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Bunny } from '../bunny/bunny';

@Component({
  selector: 'app-bunny-status',
  templateUrl: './bunny-status.component.html',
  styleUrls: ['./bunny-status.component.scss']
})
export class BunnyStatusComponent implements OnInit {

  bunny: Observable<Bunny | undefined> | undefined;
  @Input() bunnyId$: Observable<string> | undefined;
  constructor(private store: AngularFirestore, private app: AppComponent) { }

  ngOnInit(): void {
    this.bunny =  this.store.collection<Bunny>('bunnies').doc(`${this.bunnyId$}`).valueChanges();  
  }

  //   async statusPhoto() {
  //   // const points = JSON.parse(`${this.bunny}`).totalPoints;
  //    const bunnyRef =  this.store.doc<Bunny>(`bunnies/${this.bunnyId$}`).ref;
  //    try {
  //     const points = (await bunnyRef.get()).data()?.totalPoints;
  //     if (points > 50) {
  //       return "assets/images/happy.png"
  //     } else if (points > 25) {
  //       return "assets/images/content.png"
  //     } else {
  //       return "assets/images/sad.png"
  //     }
  //    } catch (error) {
  //      console.log(error);
  //      return "assets/images/sad.png"
  //    }
   
  // }
  openBunny(){
      this.app.selectedBunnyid = `${this.bunnyId$}`
  }
}
