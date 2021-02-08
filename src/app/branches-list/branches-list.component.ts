import {
	Component,
	ViewChild,
	Input,
	OnInit,
	Output,
	EventEmitter,
	ElementRef,
	AfterViewInit,
	AfterContentInit
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { BranchService } from "../branch/branch.service";
import {
	takeUntil,
	debounceTime,
	distinctUntilChanged,
	startWith,
	tap,
	delay
} from "rxjs/operators";
import { fromEvent, Subject, pipe, merge } from "rxjs";
import { Branch } from "../model/branch";
//import { MatTableDataSource } from "@angular/material/table";
import { SelectedCityService } from "../shared/selected-city.service";
import { BranchesDataSource } from "../services/branches.datasource";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import "rxjs/add/operator/filter";


@Component({
	selector: "branches-list",
	templateUrl: "./branches-list.component.html",
	styleUrls: ["./branches-list.component.css"]
})
export class BranchesListComponent implements OnInit, AfterViewInit {

	@ViewChild(MatPaginator) paginator: MatPaginator;

	branch: Branch;

	count: number;
	//branches: Branch[];
	//branchDataSource = new MatTableDataSource<any>();

	branchDataSource: BranchesDataSource;

	columnsToDisplay = [
		"ifsc",
		"branch",
		"address",
		"city",
		"district",
		"state",
		"favourite"
	];

	@Input() selected: boolean;
	@Output() selectedChange = new EventEmitter<boolean>();

	//destroy$: Subject<boolean> = new Subject<boolean>();
	selectedCityName: string;

	loading: boolean = true;
	shouldShow: boolean = true;

	@ViewChild("input", { static: false }) input: ElementRef;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private selectedCityService: SelectedCityService,
		private branchService: BranchService
	) {
		/*router.events
			.filter(e => e instanceof NavigationEnd)
			.forEach(e => {
				console.log("title", route.root.firstChild.snapshot.data);
			});*/
	}

	ngOnInit(): void {
		//this.getData('NASHIK',0,5);
		this.router.events
			.filter(e => e instanceof NavigationEnd)
			.forEach(e => {
				console.log(
					"title",
					this.route.root.firstChild.snapshot.data.course.branches[0].count
				);
				this.count = this.route.root.firstChild.snapshot.data.course.branches[0].count;
				console.log("BranchesListComponent OnInit | pageLength " + JSON.stringify(this.count));
			});

		
		this.branchDataSource = new BranchesDataSource(this.branchService);
		
		this.branchDataSource.datatableSearchAndListByCityName(
			this.selectedCityService.getSelectedCity().name.toString(),
			"",
			0,
			5
		);
	}

	ngAfterViewInit() {
		console.log("ngAfterViewInit | this.input.nativeElement.value: " + this.input.nativeElement.value);

		fromEvent(this.input.nativeElement, "keyup")
			.pipe(
				debounceTime(150),
				distinctUntilChanged(),
				tap(() => {
					this.paginator.pageIndex = 0;

					this.loadBranches();
				})
			)
			.subscribe();

		merge(this.paginator.page)
			.pipe(tap(() => this.loadBranches()))
			.subscribe();
	}

	loadBranches() {
		this.branchDataSource.datatableSearchAndListByCityName(
			this.selectedCityService.getSelectedCity().name.toString(),
			this.input.nativeElement.value,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
	}

	loadBranchesOnCitySelection(cityName: string, searchString:''){
		this.branchDataSource.datatableSearchAndListByCityName(
			cityName,
			searchString,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
	}

	ngOnDestroy() {
		//this.destroy$.next(true);
		// Unsubscribe from the subject
		//this.destroy$.unsubscribe();
		localStorage.clear();
	}

	markAsFavourite($event, element) {

		//console.log("isFavourite?:" + JSON.stringify($event));
		element['isFavourite'] = $event;
		//console.log("after marking favourite: " + JSON.stringify(element));
		localStorage.setItem(element.ifsc,  JSON.stringify(element));
	}

	/*pageChanged(event) {
		this.loading = true;

		console.log("Page changed..." + JSON.stringify(event));

		let pageIndex = event.pageIndex;
		let pageSize = event.pageSize;

		let previousIndex = event.previousPageIndex;

		let previousSize = pageSize * pageIndex;

		console.log(
			"111...previousSize: " +
				previousSize +
				" | pageIndex: " +
				pageIndex +
				" | pageSize: " +
				pageSize
		);*/

		/*this.getBranchesInCityOnPageChange(
			previousSize,
			pageIndex.toString(),
			pageSize.toString()
		);*/
	

	/*getBranchesInCityOnPageChange(currentSize, offset, limit) {
		console.log("getBranchesInCityOnPageChange:" + this.selectedCityName);
		this.branchService
			.getBranchesInCity(this.selectedCityName, offset, limit)
			.subscribe((data: any) => {
				this.loading = false;
				this.branches.length = currentSize;
				this.branches.push(...data.branches);
				this.branches.length = data.branches[0].count;

				//console.log("getBranchesInCityOnPageChange1 " + currentSize);
				//console.log("getBranchesInCityOnPageChange2 " + data.branches[0].count);

				this.branchDataSource = new MatTableDataSource<any>(this.branches);

				this.branchDataSource._updateChangeSubscription();
				this.branchDataSource.paginator = this.paginator;
			});
	}*/
}
