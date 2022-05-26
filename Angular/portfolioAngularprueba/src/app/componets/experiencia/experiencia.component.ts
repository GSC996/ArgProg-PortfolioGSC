import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/appVieja/servicios/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  miExperiencias: any;
  constructor(private datosPortfolio: PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.getExperiencia().subscribe(experienciaData => {
     // console.log(data);
      this.miExperiencias = experienciaData.experiencias;
    });
  }

}