import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "app-favourite-button",
	templateUrl: "./favourite.component.html",
	styleUrls: ["./favourite.component.css"]
})
export class FavouriteComponent implements OnInit {
	@Input() selected: boolean;
	@Output() selectedChange = new EventEmitter<boolean>();

	constructor() {}

	ngOnInit(): void {}

	public toggleSelected() {
		this.selected = !this.selected;
		this.selectedChange.emit(this.selected);
	}
}
