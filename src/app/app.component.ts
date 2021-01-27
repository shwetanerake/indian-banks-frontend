import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {BranchService} from './branch/branch.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {Branch} from './branch/branch.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Indian Bank App';
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private bankService : BranchService){}

  ngOnInit(){

  	this.bankService.getBranchesInCity().subscribe((data: Branch[])=>{
      console.log("!!!!" + JSON.stringify(data));
      
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
