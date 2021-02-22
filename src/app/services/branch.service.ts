import { Injectable } from "@angular/core";
import {
	HttpClient,
	HttpErrorResponse,
	HttpParams,
	HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { map, shareReplay } from "rxjs/operators";
import { throwError, of, EMPTY } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Branch } from "../model/branch";
import { CacheRegistrationService } from "../services/cache.registeration.service";
//import { environment } from "../../environments/environment.prod";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: "root"
})
export class BranchService {
	private serverResponse: Observable<any> = EMPTY;

	private cache = {};

	private serverHostName : string = environment.apiHostname;

	private SEARCH_API_ENDPOINT =
		this.serverHostName + "/api/branches/autocomplete";

	private BRANCH_DEATILS_API_ENDPOINT =
		this.serverHostName  + "/api/bank/branch?ifsc=";

	private GET_BRANCHES_IN_CITY_API_ENDPOINT =
		this.serverHostName  + "/api/branches?q=";

	constructor(private httpClient: HttpClient,private cacheRegistrationService: CacheRegistrationService) {
		console.log("BranchService | constructor");
		cacheRegistrationService.addToCache(this.SEARCH_API_ENDPOINT);
		cacheRegistrationService.addToCache(this.BRANCH_DEATILS_API_ENDPOINT);
		cacheRegistrationService.addToCache(this.GET_BRANCHES_IN_CITY_API_ENDPOINT);
	}

	/*constructor(private httpClient: HttpClient) {
		console.log("BranchService | constructor");
	}*/

	ngOnInit(): void {}

	sendSearchListReq(
		cityName: string,
		searchString: string,
		pageIndex = 0,
		pageSize = 5
	): Observable<any> {
		let headers = new HttpHeaders();

		// In case developer wants to reset the cache for user data then set header
		/*if (reset) {
			
			headers = headers.set("reset-cache", true);
		}*/
		let offset = pageIndex * pageSize;

		return this.httpClient.get(this.SEARCH_API_ENDPOINT, {
			params: new HttpParams()
				.set("city-name", cityName)
				.set("q", searchString)
				.set("offset", offset.toString())
				.set("limit", pageSize.toString())
		});
	}

	
	findBranchesByCityName(cityName: string): Observable<Branch[]> {
		return this.httpClient.get<Branch[]>(
			this.GET_BRANCHES_IN_CITY_API_ENDPOINT + cityName
		);
	}

	getBranchesDetails(ifsc: string): Observable<Branch> {
		return this.httpClient.get<Branch>(this.BRANCH_DEATILS_API_ENDPOINT + ifsc
		);
	}

	/*private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error("An error occurred:", error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong.
			console.error(
				`Backend returned code ${error.status}, ` + `body was: ${error.error}`
			);
		}
		// Return an observable with a user-facing error message.
		return throwError("Something bad happened; please try again later.");
	}*/

	/*public getBranchesInCity(cityName, offset, limit) {
		
		return this.httpClient.get(this.SEARCH_API_ENDPOINT,{
            params: new HttpParams()
            	.set('q',cityName)
                .set('offset', offset.toString())
                .set('limit', limit.toString())
                
        }).pipe(retry(3), catchError(this.handleError));;

	}*/

	/*sendSearchListReq(
		cityName: string,
		searchString: string,
		pageIndex = 0,
		pageSize = 5
	): Observable<any> {
		let cacheKey = cityName + ":" + pageIndex + ":" + pageSize;
		console.log("cacheKey: " + cacheKey);
		if (this.cache[cacheKey]) {
			console.log("returned cache value...");
			return of(this.cache[cacheKey]);
		}
		console.log("do the req again");

		//if (!this.serverResponse) {

		let offset = pageIndex * pageSize;

		return (this.cache[cacheKey] = this.httpClient
			.get(this.SEARCH_API_ENDPOINT, {
				params: new HttpParams()
					.set("city-name", cityName)
					.set("q", searchString)
					.set("offset", offset.toString())
					.set("limit", pageSize.toString())
			})
			.pipe(
				shareReplay(1),
				catchError(err => {
					delete this.cache[cacheKey];
					return EMPTY;
				})
			));
		//}
	}*/
}
