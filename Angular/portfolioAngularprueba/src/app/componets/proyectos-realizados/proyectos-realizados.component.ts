import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/appVieja/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos-realizados',
  templateUrl: './proyectos-realizados.component.html',
  styleUrls: ['./proyectos-realizados.component.css']
})
export class ProyectosRealizadosComponent implements OnInit {
  miPortfolio: any;
  constructor(private datosPortfolio: PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.getProyectosRealizados().subscribe(data => {
      console.log(data);
      this.miPortfolio = data;
    });
  }

}