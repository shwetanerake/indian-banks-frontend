import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-defaultlayout',
  templateUrl: './defaultlayout.component.html',
  styleUrls: ['./defaultlayout.component.css']
})
export class DefaultlayoutComponent implements OnInit {

  title = 'Indian Bank App';

  constructor() { }

  ngOnInit(): void {
  }

}
