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
	delay,
	merge
} from "rxjs/operators";
import { fromEvent, Subject, pipe } from "rxjs";
import { Branch } from "../branch";
import { MatTableDataSource } from "@angular/material/table";
import { SelectedCityService } from "../shared/selected-city.service";

@Component({
	selector: "branches-list",
	templateUrl: "./branches-list.component.html",
	styleUrls: ["./branches-list.component.css"]
})
export class BranchesListComponent implements OnInit, AfterViewInit {
	@Input() selected: boolean;
	@Output() selectedChange = new EventEmitter<boolean>();

	destroy$: Subject<boolean> = new Subject<boolean>();
	selectedCityName: String;
	branches: any[];
	columnsToDisplay = [
		"ifsc",
		"branch",
		"address",
		"city",
		"district",
		"state",
		"favourite"
	];

	loading: boolean = true;
	shouldShow: boolean = true;
	branchDataSource = new MatTableDataSource<any>();

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild("input",{static: false}) input: ElementRef;

	constructor(
		private selectedCityService: SelectedCityService,
		private branchService: BranchService
	) {}

	ngOnInit(): void {
		//this.getData('NASHIK',0,5);
	}

	ngAfterViewInit() {
		console.log("%%%%%%%%%%%%%%%%%" + this.input.nativeElement.value);

		
			/*fromEvent(this.input.nativeElement, "keyup")
			.pipe(
				debounceTime(150),
				distinctUntilChanged(),
				tap(() => {
					this.paginator.pageIndex = 0;

					this.getData(
						this.input.nativeElement.value,
						this.paginator.pageIndex * this.paginator.pageSize,
						this.paginator.pageSize
					);
				})
			)
			.subscribe();*/
       
	}

	ngOnDestroy() {
		this.destroy$.next(true);
		// Unsubscribe from the subject
		this.destroy$.unsubscribe();
	}

	public toggleSelected(event) {
		console.log("ooooooo" + JSON.stringify(event));
		this.selected = !this.selected;
		this.selectedChange.emit(this.selected);
	}

	onVoted($event, element) {
		console.log("00000000000000000000" + JSON.stringify($event));
		console.log("00000000000000000000" + JSON.stringify(element));
	}

	pageChanged(event) {
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
		);

		this.getBranchesInCityOnPageChange(
			previousSize,
			pageIndex.toString(),
			pageSize.toString()
		);
	}

	getData(cityName, offset, limit) {
		this.selectedCityName = cityName;
		this.branchService
			.getBranchesInCity(cityName, offset, limit)
			.subscribe((data: any) => {
				this.loading = false;
				this.branches = data.branches;
				console.log("branches: " + JSON.stringify(data));
				this.branches.length = data.branches[0].count;

				//console.log("branches length: " + this.branches.length);
				this.branchDataSource = new MatTableDataSource<any>(this.branches);
				this.branchDataSource.paginator = this.paginator;
			});
	}

	getBranchesInCityOnPageChange(currentSize, offset, limit) {
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
	}
}
