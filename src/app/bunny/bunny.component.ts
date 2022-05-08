import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bunny } from './bunny';

@Component({
  selector: 'app-bunny',
  templateUrl: './bunny.component.html',
  styleUrls: ['./bunny.component.scss']
})
export class BunnyComponent{
  @Input() bunny: Bunny | null = null;
  @Output() edit = new EventEmitter<Bunny>();
  constructor() { }

  ngOnInit(): void {
  }
  feed(name: string){}
  play(veg: string){}
}
