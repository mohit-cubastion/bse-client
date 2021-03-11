import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../../services/data-service.service';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-entry-form',
  templateUrl: './new-entry-form.component.html',
  styleUrls: ['./new-entry-form.component.css']
})
export class NewEntryFormComponent implements OnInit {

  subscriptions : Subscription[] = [];

  constructor(public dialogRef: MatDialogRef<NewEntryFormComponent>,
    private _dataService: DataService,
    private _snackBar: MatSnackBar
  ) { }

    postObj: Object ={};
    openModel: String;
    closeModel: String;
    recordSuccess : Boolean = false;

  ngOnInit(): void {

    this._dataService.recordAdded.subscribe(data=>{
      if(data) {
        this.recordSuccess = true;
        this.openSnackBar('Record Added', 'Success')
      }
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmitHandler(){ 
    this.addData();
  }


  addData(){
    this.postObj['Open'] = this.openModel;
    this.postObj['Close'] = this.closeModel;
    this.postObj['Date'] = new Date();
     this._dataService.addData(this.postObj);
     this.onNoClick();
     
     this.isRecordAdded();
  }

  isRecordAdded(){
    return this.subscriptions.push(this._dataService.recordAdded.subscribe((data)=>{
        if(data) this.recordSuccess = true;
    })) 
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
