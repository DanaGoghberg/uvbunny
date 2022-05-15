import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Bunny } from './bunny';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { AppComponent } from '../app.component';
// import { FirebaseApp } from '@angular/fire/app';
import { FirebaseApp } from '@angular/fire/compat';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-bunny',
  templateUrl: './bunny.component.html',
  styleUrls: ['./bunny.component.scss']
})
export class BunnyComponent{
bunny: Observable<Bunny | undefined> | undefined;
bunnies: Observable<any> | undefined;
@Input() bunnyId: string | undefined;


  constructor(private activatedRoute: ActivatedRoute, private firebaseApp: FirebaseApp, 
    private db: AngularFireDatabase, private store: AngularFirestore, private app: AppComponent) { }

  ngOnInit(): void {
    this.bunnies = this.store.collection('bunnies').snapshotChanges().pipe(
      map(snap => {
      return snap.map(a => {
          const data = a.payload.doc.data;
          const id = a.payload.doc.id;

          return { id, ...data };
      }).filter(a => a.id!=this.bunnyId);
      })
  );
    this.bunny =  this.store.collection<Bunny>('bunnies').doc(this.bunnyId).valueChanges();
  }
  

  feed(veg: string){
    const totalRef = this.firebaseApp.database().ref(`/bunnies/${this.bunnyId}/totalPoints`);
    if(veg==='Carrot'){
      const statRef = this.firebaseApp.database().ref(`/bunnies/${this.bunnyId}/carrots`);
      statRef.transaction(stat => stat + 1);
      totalRef.transaction(stat => stat + 3);

    }
    else{
      const statRef = this.firebaseApp.database().ref(`/bunnies/${this.bunnyId}/lettuse`);
      statRef.transaction(stat => stat + 1);
      totalRef.transaction(stat => stat + 1);
    }


  }
  
  play(id: string){
    const bunny1tatRef = this.firebaseApp.database().ref(`/bunnies/${this.bunnyId}`);
    const bunny2tatRef = this.firebaseApp.database().ref(`/bunnies/${id}`);

    bunny1tatRef.transaction(bunny1 => {
        if(bunny1.friends.has(id)){
          bunny1.playsWithFriend = this.getIncreasedStat( () => bunny1.playsWithFriend, 1);
          bunny1.totalPoints = this.getIncreasedStat( () => bunny1.totalPoints, 4);
          bunny2tatRef.transaction(bunny2 => {
            bunny2.playsWithFriend = this.getIncreasedStat( () => bunny2.playsWithFriend, 1);
            bunny2.totalPoints = this.getIncreasedStat( () => bunny2.totalPoints, 4);
            return bunny2;
          });
        }
        else{
          bunny1.friends[id] = true;
          bunny1.plays = this.getIncreasedStat( () => bunny1.play, 1);
          bunny1.totalPoints = this.getIncreasedStat( () => bunny1.totalPoints, 2);
          bunny2tatRef.transaction(bunny2 => {
            bunny2.friends[bunny1.id] = true;
            bunny2.plays = this.getIncreasedStat( () => bunny2.play, 1);
            bunny2.totalPoints = this.getIncreasedStat( () => bunny2.totalPoints, 2);
            return bunny2;
          });
        }
      
      return bunny1;
    });
  }

  getIncreasedStat(statGetter: () => number , modifier: number): any {
    return statGetter() + modifier;
  }

  closeBunny(){
    this.app.selectedBunnyid = undefined;
}
}
