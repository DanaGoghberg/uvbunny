import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseApp } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(
    private store: AngularFirestore) { }

  ngOnInit(): void {
  }
  carrot(amount: string) {
   this.store.doc(`config/points`).update({carrot: Number(amount)});
    // this.snackBar.open("Carrot points were updated to "+ amount);
    
  }

  lettuse(amount: string) {
    this.store.doc(`config/points`).update({lettuse: Number(amount)});
    // this.snackBar.open("Lettuse points were updated to "+ amount);
   }

    playFirst(amount: string) {
    this.store.doc(`config/points`).update({playFirst: Number(amount)});
    // this.snackBar.open("First game points were updated to ");
  }

  playFriend(amount: string) {
    this.store.doc(`config/points`).update({playFriend: Number(amount)});
    // this.snackBar.open("Friend game points were updated to "+ amount);
  }
}
