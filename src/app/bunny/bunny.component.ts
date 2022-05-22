import { Component, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Bunny } from './bunny';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { map, Observable, switchMap } from 'rxjs';
import { AppComponent } from '../app.component';
// import { FirebaseApp } from '@angular/fire/app';
import { FirebaseApp } from '@angular/fire/compat';
import {  arrayUnion, increment, setDoc } from "firebase/firestore";


@Component({
  selector: 'app-bunny',
  templateUrl: './bunny.component.html',
  styleUrls: ['./bunny.component.scss']
})
export class BunnyComponent{
bunny: Observable<Bunny & { id: string; } | undefined> | undefined;
bunnies: Observable<any> | undefined;
points: Observable<any> | undefined;
@Input() bunnyId: string | undefined;
private bunnyRef: AngularFirestoreDocument<Bunny>| undefined;



  constructor(private activatedRoute: ActivatedRoute, private firebaseApp: FirebaseApp, 
    private db: AngularFireDatabase, private store: AngularFirestore, private app: AppComponent) { }

  ngOnInit(): void {
  this.bunnies = this.store.collection('bunnies').valueChanges({idField: 'id'}).pipe(
    map(snap => 
      snap.filter(a => a.id!=this.bunnyId)));
  this.bunnyRef =  this.store.doc<Bunny>(`bunnies/${this.bunnyId}`);
  this.bunny =this.bunnyRef.valueChanges({idField: 'id'});
  this.points =  this.store.doc(`config/points`).valueChanges();

  }

  async deleteBunny() {
    // const eventsPath = this.store.collection(`bunnies/${this.bunnyId}/events`);
    const friendsPath = this.store.collection(`bunnies/${this.bunnyId}/friends`);
    const docPath = this.store.collection('bunnies').doc(this.bunnyId);
    const batch = this.store.firestore.batch();

    // let events = await eventsPath.get().toPromise();
    //   console.log(events);
    //   events?.docs.forEach((doc) => {
    //     console.log("events in bunny", doc.id)
    //     batch.delete(doc.ref);
    //   })
    
      let playmates = await friendsPath.get().toPromise();
      console.log(friendsPath);
      playmates?.docs.forEach((doc) => {
        console.log("playmates of bunny", doc.id)
        batch.delete(doc.ref);
      })

    batch.delete(docPath.ref);

    await batch.commit().then(v => {
      console.log("deleted bunny ", this.bunny);
    }).catch(err => {
      console.log("error deleting bunny ", err);
    });
    this.app.selectedBunnyid = undefined;

  }


  async feed(veg: string){
    const totalRef = this.firebaseApp.database().ref(`/bunnies/${this.bunnyId}/totalPoints`);
    if(veg==='Carrot'){
       await this.bunnyRef?.update({carrots: increment(1), totalPoints: increment(3)}).then(v => {
        console.log("Yummy Carrot ", this.bunny);
      }).catch(err => {
        console.log("error carrot not recieved ", err);
      });

    }
    else{

      await this.bunnyRef?.update({lettuse: increment(1), totalPoints: increment(1)}).then(v => {
        console.log("Yummy Lettuse" , this.bunny);
      }).catch(err => {
        console.log("error lettuce not recieved ", err);
      });
    } 

  }
  
 async play(id: string){
    const friendRef = this.store.doc<Bunny>(`bunnies/${id}`);
    const bunnyRef = this.store.doc<Bunny>(`bunnies/${this.bunnyId}`);
    const batch = this.store.firestore.batch();

    if( (await bunnyRef.ref.get()).data()?.friends.find((f: string)=> f ===id)){
      batch.update(bunnyRef?.ref, {playsWithFriends: increment(1), totalPoints: increment(4)});
      batch.update(friendRef?.ref, {playsWithFriends: increment(1), totalPoints: increment(4)});
    }
    else{
      batch.update(bunnyRef?.ref,{friends: arrayUnion(id), plays: increment(1), totalPoints: increment(2)});
      batch.update(friendRef?.ref,{friends: arrayUnion(this.bunnyId), plays: increment(1), totalPoints: increment(2)});
  }
  await batch.commit().then(v => {
    console.log("bunnies played  ", this.bunny);
  }).catch(err => {
    console.log("error playing with bunny ", err);
  });
}

closeBunny(){
    this.app.selectedBunnyid = undefined;
}



ngOnDestroy() {

  }
}



