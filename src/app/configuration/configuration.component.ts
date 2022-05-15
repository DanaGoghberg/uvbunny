import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseApp } from '@angular/fire/compat';
// import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(
    private firebaseApp: FirebaseApp) { }

  ngOnInit(): void {
  }
  carrot(amount: string) {
    const statRef = this.firebaseApp.database().ref(`/points/carrot`);
    statRef.set(Number(amount));
    // this.snackBar.open("Carrot points were updated to "+ amount);
    
  }

  lettuse(amount: string) {
    const statRef = this.firebaseApp.database().ref(`/points/lettus`);
    statRef.set(Number(amount));
    // this.snackBar.open("Lettuse points were updated to "+ amount);
   }

    playFirst(amount: string) {
    const statRef = this.firebaseApp.database().ref(`/points/playFirst`);
    statRef.set(Number(amount));
    // this.snackBar.open("First game points were updated to ");
  }

  playFriend(amount: string) {
    const statRef = this.firebaseApp.database().ref(`/points/playFriend`);
    statRef.set(Number(amount));
    // this.snackBar.open("Friend game points were updated to "+ amount);
  }
}
