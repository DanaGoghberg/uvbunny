import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bunny } from '../bunny/bunny';
@Component({
  selector: 'app-bunny-dialog',
  templateUrl: './bunny-dialog.component.html',
  styleUrls: ['./bunny-dialog.component.scss']
})
export class BunnyDialogComponent {
  private backupBunny: Partial<Bunny> = { ...this.data.bunny };
  constructor(
  public dialogRef: MatDialogRef<BunnyDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: BunnyDialogData) {}

  cancel(): void {
    this.data.bunny.name = this.backupBunny.name;
    this.dialogRef.close(this.data);
  }
}

export interface BunnyDialogData {
  bunny: Partial<Bunny>;
}

export interface BunnyDialogResult {
  bunny: Bunny;
}