import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  maxFecha = Date.now();
  year!: number;

  constructor() { }

  ngOnInit(): void {
    this.year =  new Date(this.maxFecha).getFullYear();
  }

}
