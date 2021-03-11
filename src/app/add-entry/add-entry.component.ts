import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NewEntryFormComponent } from '../new-entry-form/new-entry-form.component';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {

  @Input() buttonName: String;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewEntryFormComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
