import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { catchError, tap } from 'rxjs/operators'
import { environment } from '../../environments/environment';
import { HandleErrorService } from "../shared/error-handle.service";

@Injectable({providedIn:'root'})
export class ContactService {
  
    constructor(private http : HttpClient,
        private handleErrorService: HandleErrorService){}         
         
    getList(){
        return this.http
        .get<Response>(`${environment.serverApiURL}/Contact`)
        .pipe(
            catchError(this.handleErrorService.handleError),
            tap(resData => { return resData; })
        );
    }
    
    getItem(id:string){
        return this.http
        .get<Response>(`${environment.serverApiURL}/Contact/${id}`)
        .pipe(
            catchError(this.handleErrorService.handleError),
            tap(resData => { return resData; })
        );
    }

    addItem(data:any){
        return this.http
        .post<Response>(`${environment.serverApiURL}/Contact`,data)
        .pipe(
            catchError(this.handleErrorService.handleError),
            tap(resData => { return resData; })
        );
    }

    updateItem(id:string, data:any){
        return this.http
        .put<Response>(`${environment.serverApiURL}/Contact/${id}`,data) 
        .pipe(
          catchError(this.handleErrorService.handleError),
          tap(resData => { return resData; })
        );
    }
    
    deleteItem(id:string){
        return this.http
        .delete<Response>(
            `${environment.serverApiURL}/Contact/${id}`)
        .pipe(
            catchError(this.handleErrorService.handleError),
            tap(resData => { return resData; })
        );
    }
}
