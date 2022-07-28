import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/servicios/skill.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  public skills: Skill[] = [];
  public updateSkill: Skill | undefined;
  public deleteSkill: Skill | undefined;
  isAdmin = false;

  constructor(private skillService: SkillService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getSkills();
    if (this.tokenService.canConfig()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  public getSkills(): void {
    this.skillService.getSkill().subscribe({
      next: (response: Skill[]) => {
        this.skills = response;
      }, error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: string, skill?: Skill): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSkillModal');
    } else if (mode === 'delete') {
      this.deleteSkill = skill;
      button.setAttribute('data-target', '#deleteSkillModal');
    } else if (mode === 'edit') {
      this.updateSkill = skill;
      button.setAttribute('data-target', '#editSkillModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddSkill(addForm: NgForm): void {
    document.getElementById('add-skill-form')?.click();
    this.skillService.addSkill(addForm.value).subscribe(
      {
        next: (response: Skill) => {
          console.log(response);
          this.getSkills();
          addForm.resetForm();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      }
    )
  }

  public onEditSkill(skill: Skill) {
    this.updateSkill = skill;
    document.getElementById('add-skill-form')?.click();
    this.skillService.updateSkill(skill).subscribe(
      {
        next: (response: Skill) => {
          console.log(response);
          this.getSkills();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  public onDeleteSkill(idSkill: number): void {
    this.skillService.deleteSkill(idSkill).subscribe(
      {
        next: (response: void) => {
          console.log(response);
          this.getSkills();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }
}
