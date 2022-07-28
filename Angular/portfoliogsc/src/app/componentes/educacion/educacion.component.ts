import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public educaciones: Educacion[] = [];
  public updateEducacion: Educacion | undefined;
  public deleteEducacion: Educacion | undefined;
  isAdmin = false;

  constructor(private educacionService: EducacionService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getEducaciones();
    if (this.tokenService.canConfig()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  public getEducaciones(): void {
    this.educacionService.getEducacion().subscribe({
      next: (response: Educacion[]) => {
        this.educaciones = response;
      }, error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: string, educacion?: Educacion): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEducacionModal');
    } else if (mode === 'delete') {
      this.deleteEducacion = educacion;
      button.setAttribute('data-target', '#deleteEducacionModal');
    } else if (mode === 'edit') {
      this.updateEducacion = educacion;
      button.setAttribute('data-target', '#editEducacionModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddEducacion(addForm: NgForm): void {
    document.getElementById('add-educacion-form')?.click();
    this.educacionService.addEducacion(addForm.value).subscribe(
      {
        next: (response: Educacion) => {
          console.log(response);
          this.getEducaciones();
          addForm.resetForm();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      }
    )
  }

  public onEditEducacion(educacion: Educacion) {
    this.updateEducacion = educacion;
    document.getElementById('add-educacion-form')?.click();
    this.educacionService.updateEducacion(educacion).subscribe(
      {
        next: (response: Educacion) => {
          console.log(response);
          this.getEducaciones();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  public onDeleteEducacion(idEdu: number): void {
    this.educacionService.deleteEducacion(idEdu).subscribe(
      {
        next: (response: void) => {
          console.log(response);
          this.getEducaciones();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }
}
