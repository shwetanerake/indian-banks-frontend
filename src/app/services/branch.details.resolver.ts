import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	Resolve,
	RouterStateSnapshot
} from "@angular/router";
import { Branch } from "../model/branch";
import { Observable } from "rxjs";
import { BranchService } from "./branch.service";

@Injectable()
export class BranchDetailsResolver implements Resolve<Branch> {
	constructor(private branchService: BranchService) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<Branch> {
		return this.branchService.getBranchesDetails(route.params["ifsc"]);
	}
}
