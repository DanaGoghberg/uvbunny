import { Component, OnInit, Input } from '@angular/core';
import { Bunny } from '../bunny/bunny';

@Component({
  selector: 'app-bunny-status',
  templateUrl: './bunny-status.component.html',
  styleUrls: ['./bunny-status.component.scss']
})
export class BunnyStatusComponent implements OnInit {
  @Input() bunny: Bunny | null | undefined

  constructor() { }

  ngOnInit(): void {
  }
  happiness() : number{
    return 10;
  }
  get status(): string {
    if (this.happiness() > 50) {
      return 'happy'
    } else if (this.happiness() > 25) {
      return 'content'
    } else {
      return 'sad'
    }
  }
  openBunny(){}
}
