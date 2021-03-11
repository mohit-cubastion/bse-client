import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public recordAdded = new BehaviorSubject<Boolean>(false);
  constructor(private _http: HttpClient) { }

  getData(id){
    return this._http.get(`http://localhost:3001/db/${id}`);
  }

  addData(data){
    return  this._http.post('http://localhost:3001/db/addRecord',data).subscribe((res)=>{
        try {
          if(res["status_code"] == '1005'){
            this.recordAdded.next(true);
          }
        } catch (error) {
          
        }
    })
  }
}
