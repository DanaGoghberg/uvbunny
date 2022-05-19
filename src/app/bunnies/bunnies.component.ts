import { Component, OnInit } from '@angular/core';
import { Observable ,BehaviorSubject, map, tap} from 'rxjs';
import { Bunny } from '../bunny/bunny'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BunnyDialogComponent, BunnyDialogResult } from '../bunny-dialog/bunny-dialog.component';

const getObservable = (collection: AngularFirestoreCollection<Bunny>) => {
  const subject = new BehaviorSubject<Bunny[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Bunny[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-bunnies',
  templateUrl: './bunnies.component.html',
  styleUrls: ['./bunnies.component.scss']
})
export class BunniesComponent{
  bunnies: Observable<any> | undefined;
  averageHappiness = 0;
  bunniesWithImage: Observable<any> | undefined;
  constructor( private dialog: MatDialog, private store: AngularFirestore) { 
      this.bunnies = this.store.collection('bunnies', ref => ref.orderBy('totalPoints','asc')).valueChanges({idField: 'id'});
      this.bunniesWithImage = this.bunnies.pipe(
        map(bunnies =>  bunnies.map((b:any) => (
          {id: b.id, data: b, image: this.setImage(b.totalPoints)}
        )
        ))
      );
        //   this.getAvrg();
  } 
  setImage(happiness: number) {
 // set the emoji according to happiness points
 if(happiness === undefined)  return ""
  if(happiness <= this.averageHappiness - 15) {
    return "assets/images/sad.png"
  } else if(happiness >= this.averageHappiness + 20) {
    return "assets/images/happy.png"
  } else 
    return "assets/images/content.png"
}  

   // create new Bunny!
   addBunny(): void {
    const dialogRef = this.dialog.open(BunnyDialogComponent, {
      width: '270px',
      data: {
        bunny: {
          totalPoints : 0,
          players :[],
          carrots: 0,
          lettuse: 0,
          plays :0,
          playsWithFriend:  0
        },
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: BunnyDialogResult) => {
        if (!result) {
          return;
        }
        if (!result.bunny.name) {
          console.log("Bunny has to have a name, he's special:)")
          return;
        }
        this.store.collection('bunnies').add(result.bunny);
      });
  }

}

