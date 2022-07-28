import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TokenService } from 'src/app/servicios/token.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  public persona: Persona | undefined;
  public updatePersona: Persona | undefined;
  public deletePersona: Persona | undefined;
  isAdmin = false;
  validado!: string;
  maxFecha = Date.now();
  formPersona: FormGroup;

  constructor(private personaService: PersonaService, private tokenService: TokenService, private formBuilder: FormBuilder) {

    this.formPersona = this.formBuilder.group(
      {
        id: 1,
        nombre: ['', [Validators.required, Validators.maxLength(45), Validators.pattern('^[a-zA-Z \-\']+')]],
        apellido: ['', [Validators.required, Validators.maxLength(45), Validators.pattern('^[a-zA-Z \-\']+')]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(60)]],
        fecha_nacimiento: ['', [Validators.required]],
        foto_perfil: ['', [Validators.required, Validators.maxLength(255)]],
        foto_portada: ['', [Validators.required, Validators.maxLength(255)]],
        locacion: ['', [Validators.required, Validators.maxLength(60)]],
        ocupacion: ['', [Validators.required, Validators.maxLength(45), Validators.pattern('^[a-zA-Z \-\']+')]],
        sobre_mi: ['', [Validators.required, Validators.maxLength(255)]],
        telefono: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9 \-\']+')]]
      }
    )
  }

  ngOnInit(): void {
    this.getPersonas();
    if (this.tokenService.canConfig()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  get Nombre() {
    return this.formPersona.get('nombre');
  }
  get Apellido() {
    return this.formPersona.get('apellido');
  }
  get Email() {
    return this.formPersona.get('email');
  }
  get FechaN() {
    return this.formPersona.get('fecha_nacimiento');
  }
  get FotoPerf() {
    return this.formPersona.get('foto_perfil');
  }
  get FotoPort() {
    return this.formPersona.get('foto_portada');
  }
  get Locacion() {
    return this.formPersona.get('locacion');
  }
  get Ocupacion() {
    return this.formPersona.get('ocupacion');
  }
  get SobreMi() {
    return this.formPersona.get('sobre_mi');
  }
  get Telefono() {
    return this.formPersona.get('telefono');
  }

  public getPersonas(): void {
    this.personaService.getPersona().subscribe({
      next: (response: Persona) => {
        this.persona = response;
        let cumpleString = this.persona.fecha_nacimiento.toString();
        let cumple = new Date(cumpleString);
        const timeDiff = Math.abs(Date.now() - cumple.getTime());
        this.persona.edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      }, error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: string, persona?: Persona): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.updatePersona = persona;
      button.setAttribute('data-target', '#editPersonaModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onEditPersona(persona: Persona) {
    this.updatePersona = persona;
    document.getElementById('add-persona-form')?.click();
    this.personaService.updatePersona(persona).subscribe(
      {
        next: (response: Persona) => {
          console.log(response);
          this.getPersonas();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  submit() {
    if (this.formPersona.valid) {
      this.validado = "Todos los datos son válidos";
      return true;
    }
    else {
      this.validado = "Revisar los datos ingresados";
      return false;
    }
  }
}