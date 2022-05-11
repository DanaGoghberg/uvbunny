import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseApp } from '@angular/fire/compat';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private firebaseApp: FirebaseApp) { }

  ngOnInit(): void {
  }
  carrot(amount: number) {
    const statRef = this.firebaseApp.database().ref(`/points/carrot`);
    statRef.transaction(stat => stat + 10);
  }

  lettuse(amount: number) {
    const statRef = this.firebaseApp.database().ref(`/points/lettus`);
    statRef.transaction(stat => stat + 10);
  }

  game(amount: number) {
    const statRef = this.firebaseApp.database().ref(`/points/game`);
    statRef.transaction(stat => stat + 10);
    statRef.update
  }

}
