import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class BranchService {

	private BRANCHES_IN_CITY_API = "http://localhost:8082/api/branches/autocomplete";

	constructor(private httpClient: HttpClient) {}

	ngOnInit(): void {

	}

	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong.
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`);
		}
		// Return an observable with a user-facing error message.
		return throwError(
			'Something bad happened; please try again later.');
	}

	public getBranchesInCity(cityName, offset, limit) {
		
		return this.httpClient.get(this.BRANCHES_IN_CITY_API,{
            params: new HttpParams()
            	.set('q',cityName)
                .set('offset', offset.toString())
                .set('limit', limit.toString())
                
        }).pipe(retry(3), catchError(this.handleError));;

	}
}
