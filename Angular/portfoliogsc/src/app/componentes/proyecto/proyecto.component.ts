import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  public proyectos: Proyecto[] = [];
  public updateProyecto: Proyecto | undefined;
  public deleteProyecto: Proyecto | undefined;
  isAdmin = false;

  constructor(private proyectoService: ProyectoService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getProyectos();
    if (this.tokenService.canConfig()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  public getProyectos(): void {
    this.proyectoService.getProyecto().subscribe({
      next: (response: Proyecto[]) => {
        this.proyectos = response;
      }, error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: string, proyecto?: Proyecto): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProyectoModal');
    } else if (mode === 'delete') {
      this.deleteProyecto = proyecto;
      button.setAttribute('data-target', '#deleteProyectoModal');
    } else if (mode === 'edit') {
      this.updateProyecto = proyecto;
      button.setAttribute('data-target', '#editProyectoModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddProyecto(addForm: NgForm): void {
    document.getElementById('add-proyecto-form')?.click();
    this.proyectoService.addProyecto(addForm.value).subscribe(
      {
        next: (response: Proyecto) => {
          console.log(response);
          this.getProyectos();
          addForm.resetForm();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      }
    )
  }

  public onEditProyecto(proyecto: Proyecto) {
    this.updateProyecto = proyecto;
    document.getElementById('add-proyecto-form')?.click();
    this.proyectoService.updateProyecto(proyecto).subscribe(
      {
        next: (response: Proyecto) => {
          console.log(response);
          this.getProyectos();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  public onDeleteProyecto(idProy: number): void {
    this.proyectoService.deleteProyecto(idProy).subscribe(
      {
        next: (response: void) => {
          console.log(response);
          this.getProyectos();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }
}
