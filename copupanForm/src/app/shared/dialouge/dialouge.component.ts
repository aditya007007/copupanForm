import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialouge',
  templateUrl: './dialouge.component.html',
  styleUrls: ['./dialouge.component.scss']
})
export class DialougeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialougeComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

  }
}
