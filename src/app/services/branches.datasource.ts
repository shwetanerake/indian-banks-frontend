import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Branch } from "../model/branch";
import { Observable, BehaviorSubject, of } from "rxjs";
import { BranchService } from "../branch/branch.service";
import { catchError, finalize } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";

export class BranchesDataSource implements DataSource<Branch> {
	
	private loadingSubject = new BehaviorSubject<boolean>(false);

	private branchesSubject = new BehaviorSubject<Branch[]>([]);

	public loading$ = this.loadingSubject.asObservable();

	constructor(private branchService: BranchService) {}

	datatableSearchAndListByCityName(
		cityName: string,
		searchString: string,
		offset: number,
		limit: number
	) {
		console.log("In datatableSearchAndListByCityName....");
		this.loadingSubject.next(true);

		this.branchService
			.sendSearchListReq(cityName, searchString, offset, limit)
			.pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe(data => {
				//console.log("--------------------------------");
				//console.log("server req status" + JSON.stringify(data));
				//console.log("--------------------------------");
				if (data["exit_code"] == 0) {
					let serverResultArray = data["result"];
					for (var serverResultJson of serverResultArray) {

						let localStorageJson = JSON.parse(localStorage.getItem(serverResultJson['ifsc']));
						//console.log("localStorageJson: " + JSON.stringify(localStorageJson));
						if(localStorageJson!=null && localStorageJson['isFavourite'])	{
							serverResultJson['isFavourite'] = true;
						} else {
							serverResultJson['isFavourite'] = false;
						}
						
     					//console.log(JSON.stringify(serverResultJson));
     					//localStorage.setItem(serverResultJson['ifsc'],serverResultJson.toString());
					}
					this.branchesSubject.next(data["result"]);
				} else {
					
					catchError(() => of([])), finalize(() => this.loadingSubject.next(false));
				}
			});
		//.subscribe(branches => this.branchesSubject.next(branches));
	}

	connect(collectionViewer: CollectionViewer): Observable<Branch[]> {
		console.log("in collectionViewer connect...");
		return this.branchesSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		console.log("in collectionViewer disconnect...");
		this.loadingSubject.complete();
		this.branchesSubject.complete();
	}
}
