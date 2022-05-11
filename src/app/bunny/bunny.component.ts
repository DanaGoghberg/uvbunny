import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Bunny } from './bunny';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
// import { FirebaseApp } from '@angular/fire/app';
import { FirebaseApp } from '@angular/fire/compat';

@Component({
  selector: 'app-bunny',
  templateUrl: './bunny.component.html',
  styleUrls: ['./bunny.component.scss']
})
export class BunnyComponent{
bunny: Observable<Bunny | undefined> | undefined;
@Input() bunnyId$: Observable<string> | undefined;

//   Input() bunnyName: string | null = null;
//   @Output() edit = new EventEmitter<Bunny>();
  constructor(private activatedRoute: ActivatedRoute, private firebaseApp: FirebaseApp, 
    private db: AngularFireDatabase, private store: AngularFirestore) { }

  ngOnInit(): void {
    const key = this.bunnyId$;
    const bunnies = this.store.collection<Bunny>('bunnies');
    this.bunny =  bunnies.doc(`${key}`).valueChanges();
  }

  feed(veg: string){
    const totalRef = this.firebaseApp.database().ref(`/bunnies/${this.bunnyId$}/totalPoints`);
    if(veg==='Carrot'){
      const statRef = this.firebaseApp.database().ref(`/bunnies/${this.bunnyId$}/carrots`);
      statRef.transaction(stat => stat + 1);
      totalRef.transaction(stat => stat + 3);

    }
    else{
      const statRef = this.firebaseApp.database().ref(`/bunnies/${this.bunnyId$}/lettuse`);
      statRef.transaction(stat => stat + 1);
      totalRef.transaction(stat => stat + 1);
    }


  }
  
  play(name: string){
    const bunny1tatRef = this.firebaseApp.database().ref(`/bunnies/${this.bunnyId$}`);
    bunny1tatRef.transaction(bunny => {
      if (bunny) {
        if(bunny.friends.has(name)){
          bunny.playsWithFriend = this.getIncreasedStat( () => bunny.playsWithFriend, 1);
          bunny.totalPoints = this.getIncreasedStat( () => bunny.totalPoints, 4);
        }
        else{
          bunny.friends[name] = true;
          bunny.plays = this.getIncreasedStat( () => bunny.play, 1);
          bunny.totalPoints = this.getIncreasedStat( () => bunny.totalPoints, 2);
        }
      }
      return bunny;
    });
  }

  getIncreasedStat(statGetter: () => number , modifier: number): any {
    return statGetter() + modifier;
  }
}
