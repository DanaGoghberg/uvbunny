import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Bunny } from '../bunny/bunny';

@Component({
  selector: 'app-bunny-status',
  templateUrl: './bunny-status.component.html',
  styleUrls: ['./bunny-status.component.scss']
})
export class BunnyStatusComponent implements OnInit {

  bunny: Observable<Bunny | undefined> | undefined;
  @Input() bunnyId$: Observable<string> | undefined;
  constructor(private store: AngularFirestore, private app: AppComponent) { }

  ngOnInit(): void {
    this.bunny =  this.store.collection<Bunny>('bunnies').doc(`${this.bunnyId$}`).valueChanges();  
  }

  openBunny(){
      this.app.selectedBunnyid = `${this.bunnyId$}`
  }
}
