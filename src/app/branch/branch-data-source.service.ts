import { Injectable } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Branch} from '../branch';
import {Observable} from 'rxjs/Observable';
import {BranchService} from './branch.service';

@Injectable({
	providedIn: 'root'
})
export class BranchDataSourceService implements DataSource < Branch > {

	private branchSubject = new BehaviorSubject < Branch[] > ([]);
	private loadingSubject = new BehaviorSubject < boolean > (false);

	constructor(private bankService: BranchService) {}

	connect(collectionViewer: CollectionViewer): Observable < Branch[] > {
		return this.branchSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.branchSubject.complete();
		this.loadingSubject.complete();
	}

}