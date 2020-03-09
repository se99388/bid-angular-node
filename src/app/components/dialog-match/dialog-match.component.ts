import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-match',
  templateUrl: './dialog-match.component.html',
  styleUrls: ['./dialog-match.component.css']
})
export class DialogMatchComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DialogMatchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
