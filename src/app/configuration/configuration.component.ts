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
  babyHungry() {
    const statRef = this.firebaseApp.database().ref(`/babies/${this.babyId}/hunger`);
    statRef.transaction(stat => stat + 10);
  }

  babyShitty() {
    const statRef = this.firebaseApp.database().ref(`/babies/${this.babyId}/shittiness`);
    statRef.transaction(stat => stat + 10);
  }

  babySleepy() {
    const statRef = this.firebaseApp.database().ref(`/babies/${this.babyId}/sleepiness`);
    statRef.transaction(stat => stat + 10);
  }

}
