import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseApp } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar,
    private store: AngularFirestore) { }

  ngOnInit(): void {
  }
  carrot(amount: string) {
   this.store.doc(`config/points`).update({carrot: Number(amount)});
    this._snackBar.open("Carrot points were updated to " + amount, '',{
      duration:3000
    });
    
  }

  lettuse(amount: string) {
    this.store.doc(`config/points`).update({lettuse: Number(amount)});
    this._snackBar.open("Lettuse points were updated to "+ amount, '',{
      duration:3000
    });
   }

    playFirst(amount: string) {
    this.store.doc(`config/points`).update({playFirst: Number(amount)});
    this._snackBar.open("First game points were updated to " + amount, '',{
      duration:3000
    });
  }

  playFriend(amount: string) {
    this.store.doc(`config/points`).update({playFriend: Number(amount)});
    this._snackBar.open("Friend game points were updated to "+ amount, '',{
      duration:3000
    });
  }
}
