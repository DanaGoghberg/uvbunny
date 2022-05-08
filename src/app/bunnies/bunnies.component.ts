import { Component, OnInit } from '@angular/core';
import { Observable ,BehaviorSubject} from 'rxjs';
import { Bunny } from '../bunny/bunny'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire//compat/firestore';
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
  bunnies: Observable<Bunny[]> | undefined;

  constructor( private dialog: MatDialog, private store: AngularFirestore) { 
    // this.bunnies = getObservable(this.store.collection('bunnies')) as Observable<Bunny[]>;
    this.bunnies = store.collection('bunnies').valueChanges() as Observable<Bunny[]>;
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
        this.store.collection('bunnies').add(result.bunny);
      });
  }

}



