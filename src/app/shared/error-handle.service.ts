import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({providedIn:'root'})

export class HandleErrorService{

  handleError(errorRes: HttpErrorResponse) {
      // console.log(errorRes);
      let errorMessage = 'An unknown error occurred!';
      if (!errorRes.error || !errorRes.error.status) {
        return throwError(errorMessage);
      }
      else{
        errorMessage = errorRes.error.status.message;
        return throwError(errorMessage);
      }

  }
}

 