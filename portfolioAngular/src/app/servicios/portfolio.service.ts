import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  getInfoPersonal(): Observable<any> {
    return this.http.get('./assets/data/infoPersonalData.json');
    
  }

  getExperiencia(): Observable<any> {
    return this.http.get('./assets/data/experienciaData.json');
  }

  getEducacion(): Observable<any> {
    return this.http.get('./assets/data/data.json');
  }

  getSkills(): Observable<any> {
    return this.http.get('./assets/data/data.json');
  }

  getProyectosRealizados(): Observable<any> {
    return this.http.get('./assets/data/data.json');
  }
}
