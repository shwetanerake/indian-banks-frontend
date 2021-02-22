import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BranchService } from "../services/branch.service";
import { Branch } from "../model/branch";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs";
@Component({
	selector: "app-branch",
	templateUrl: "./branch.component.html",
	styleUrls: ["./branch.component.css"]
})
export class BranchComponent implements OnInit {
	private ifsc: string;
	displayColumns: string[];
	private inputData: Branch[] = [];
	displayData: any[];
	private branchDetails: Branch;
	private inputColumns = [
		"bank_id",
		"ifsc",
		"bank_name",
		"branch",
		"address",
		"city",
		"district",
		"state"
	];
	showTable : boolean = true;

	constructor(
		private route: ActivatedRoute,
		private branchService: BranchService
	) {
		console.log("BranchComponent | constructor");
	}

	ngOnInit(): void {
		console.log("BranchComponent | ngOnInit");
		this.ifsc = this.route.snapshot.paramMap.get("ifsc");
		this.fetchBranchDetails(this.ifsc);
	}

	fetchBranchDetails(ifsc: string) {
		this.branchService
			.getBranchesDetails(this.ifsc)
			.pipe(
				catchError(() => of([]))
			)
			.subscribe(data => {
				if (data["exit_code"] == 0) {
					
					this.branchDetails = data["branch_details"];
					this.inputData.push(this.branchDetails);

					this.displayColumns = ["0"].concat(
						this.inputData.map(x => x.bank_id.toString())
					);
					this.displayData = this.inputColumns.map(x => this.formatInputRow(x));
				} else {
					console.log("fetchBranchDetails | error: " + JSON.stringify(data));
					this.displayData = [];
					this.showTable =false;

				}
			});
	}

	formatInputRow(row) {
		//console.log("row: " + row);
		const output = {};

		output[0] = row.replace(/_/g, " ").toUpperCase();
		for (let i = 0; i < this.inputData.length; ++i) {
			//console.log("this.inputData[i].bank_id: " + this.inputData[i].bank_id);
			//console.log("this.inputData[i][row]" + this.inputData[i][row]);
			output[this.inputData[i].bank_id] = this.inputData[i][row];
		}
		//console.log("output: " + JSON.stringify(output));
		return output;
	}
}
