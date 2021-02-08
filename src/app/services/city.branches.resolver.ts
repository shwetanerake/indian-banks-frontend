import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	Resolve,
	RouterStateSnapshot
} from "@angular/router";
import { Branch } from "../model/branch";
import { Observable } from "rxjs";
import { BranchService } from "../branch/branch.service";

@Injectable()
export class CityBranchesResolver implements Resolve<Branch[]> {
	constructor(private branchService: BranchService) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<Branch[]> {
		return this.branchService.findBranchesByCityName(route.params["q"]);
	}
}
