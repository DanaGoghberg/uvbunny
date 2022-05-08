import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bunny } from './bunny';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bunny',
  templateUrl: './bunny.component.html',
  styleUrls: ['./bunny.component.scss']
})
export class BunnyComponent{
  @Input() bunny: Bunny | null = null;
  @Output() edit = new EventEmitter<Bunny>();
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute
    .params
    .subscribe(
      p => {
        const key = p['id'];
        // TODO: get bunny from Firebase using key
      }
    );
  }
  feed(name: string){}
  play(veg: string){}
}
