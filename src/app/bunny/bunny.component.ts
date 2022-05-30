import { Component, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Bunny } from './bunny';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { map, Observable, switchMap } from 'rxjs';
import { AppComponent } from '../app.component';
import { FirebaseApp } from '@angular/fire/compat';
import {  arrayUnion, increment, setDoc } from "firebase/firestore";
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-bunny',
  templateUrl: './bunny.component.html',
  styleUrls: ['./bunny.component.scss']
})
export class BunnyComponent{
bunny: Observable<Bunny & { id: string; } | undefined> | undefined;
bunnyData: Bunny| undefined
bunnies: Observable<any> | undefined;
pointsRef!: AngularFirestoreDocument<any>;
@Input() bunnyId: string | undefined;
private bunnyRef: AngularFirestoreDocument<Bunny>| undefined;



  constructor(private _snackBar: MatSnackBar, private firebaseApp: FirebaseApp, 
    private db: AngularFireDatabase, private store: AngularFirestore, private app: AppComponent) { }

  async ngOnInit(): Promise<void> {
    this.bunnies = this.store.collection('bunnies').valueChanges({idField: 'id'}).pipe(
      map(snap => 
        snap.filter(a => a.id!=this.bunnyId)));
    this.bunnyRef =  this.store.doc<Bunny>(`bunnies/${this.bunnyId}`);
    this.bunny =this.bunnyRef.valueChanges({idField: 'id'});
    this.pointsRef =  this.store.doc(`config/points`);
    this.bunnyData = (await (this.store.doc<Bunny>(`bunnies/${this.bunnyId}`).ref.get())).data()
  }

  async deleteBunny() {
    const docPath = this.store.collection('bunnies').doc(this.bunnyId);
    docPath.delete();
    this.app.selectedBunnyid = undefined;

  }

  async feed(veg: string){
    try{
      const points  =  (await this.pointsRef.ref.get()).data();
      if(veg==='Carrot'){
        await this.bunnyRef?.update({carrot: increment(1), totalPoints: increment(points.carrot)}).then(v => {
          console.log("Yummy Carrot ", this.bunny);
        }).catch(err => {
          console.log("error carrot not recieved ", err);
        });
        this._snackBar.open('Yummy Carrot!!!' ,'',{
          duration:2000
        });
      }
      else{
        await this.bunnyRef?.update({lettuse: increment(1), totalPoints: increment(points.lettuse)}).then(v => {
          console.log("Yummy Lettuse" , this.bunny);
        }).catch(err => {
          console.log("error lettuce not recieved ", err);
        });
        this._snackBar.open('Yummy Lettuse!!!','',{
          duration:2000
        });
      } 
  }
  catch(err){
    console.log("Error: " + err);
  }
}
  
 async play(id: string){
    const friendRef = this.store.doc<Bunny>(`bunnies/${id}`);
    const bunnyRef = this.store.doc<Bunny>(`bunnies/${this.bunnyId}`);
    const batch = this.store.firestore.batch();
    try{
    const points  =  (await this.pointsRef.ref.get()).data();
    if( (await bunnyRef.ref.get()).data()?.friends.find((f: string)=> f ===id)){
      batch.update(bunnyRef?.ref, {playFriend: increment(1), totalPoints: increment(points.playFriend)});
      batch.update(friendRef?.ref, {playFriend: increment(1), totalPoints: increment(points.playFriend)});
      this._snackBar.open('Love meeting new friends!!!','',{
        duration:2000
      });
    }
    else{
      batch.update(bunnyRef?.ref,{friends: arrayUnion(id), playFirst: increment(1), totalPoints: increment(points.playFirst)});
      batch.update(friendRef?.ref,{friends: arrayUnion(this.bunnyId), playFirst: increment(1), totalPoints: increment(points.playFirst)});
      this._snackBar.open('Playin with my hommie!!!','',{
        duration:2000
      });
    }
    await batch.commit().then(v => {
      console.log("bunnies played  ", this.bunny);
    }).catch(err => {
      console.log("error playing with bunny ", err);
    });
  } 
  catch(err){
  console.log("Error: " + err);
  }
 }

closeBunny(){
    this.app.selectedBunnyid = undefined;
}

}



