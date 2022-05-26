import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/appVieja/servicios/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  miPortfolio: any;
  constructor(private datosPortfolio: PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.getSkills().subscribe(data => {
      console.log(data);
      this.miPortfolio = data;
    });
  }

}