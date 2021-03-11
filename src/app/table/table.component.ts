import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data-service.service';
import { EventEmitter } from 'events';
import * as _ from 'lodash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns : string[]= ['position', 'date', 'open', 'close'];
  pageNumber : Number = 1;
  recordDate: Array<string> = [];
  totalDataLength: Number = 0;
  dbData: Object = {};
  tempData;
  constructor(private _dataService: DataService) { }

  page = new EventEmitter();


  ngOnInit(): void {
    this.getData(this.pageNumber);
  }

  getData(id){
    this._dataService.getData(id).subscribe((data)=>{
      this.dbData = Object.assign({}, data);

      this.recordDate = [...data['data']];
      this.totalDataLength = data['length'];
      this.sortDate();
    })
  }

  sortDate(){
     this.dbData["data"].map((data, index)=>{
        data["Date"] = new Date(data["Date"])
        data['id'] = index+1;
        const newdate = this.buildDate(data);
        data["DateToShow"]= newdate;
        return data
    });
    this.tempData = this.dbData['data'];
    this.tempData = _.orderBy(this.tempData,(value)=>{
        return new Date(value.Date)
    }, "desc");
    this.tempData = this.tempData.map((data, index)=>{
      data['id'] = index+1;
      return data;
    })
  }


  buildDate(data){
      let date: Date = data.Date;
      date = new Date(date);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getUTCFullYear();
      
      let myDate = `${day}-${month}-${year}`;
      return myDate;
  }

  onPageFired(event){
    this.pageNumber = event.pageIndex + 1;
    this.getData(this.pageNumber)
  }
}