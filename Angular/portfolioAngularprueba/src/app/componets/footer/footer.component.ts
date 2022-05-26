import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/appVieja/servicios/portfolio.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  miPortfolio: any;
  constructor(private datosPortfolio: PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.getInfoPersonal().subscribe(data => {
      console.log(data);
      this.miPortfolio = data;
    });
  }

}




