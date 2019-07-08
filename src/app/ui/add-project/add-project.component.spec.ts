import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectComponent } from './add-project.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { NgSelect2Module } from 'ng-select2';
import {Pipe, PipeTransform} from '@angular/core';
import { User } from 'src/app/MODELS/user';
import { Project } from 'src/app/MODELS/project';
import { OrderModule } from 'ngx-order-pipe';

@Pipe({
  name: 'projectfilter'
})
export class ProjectFilterPipe implements PipeTransform {
  transform(projects: Project[], searchTerm:string): Project[] {
    if (projects && projects.length && searchTerm) {
      return projects.filter(projects=>
        projects.ProjectName.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1
      || projects.Priority.toString().indexOf(searchTerm) != -1
      || ((projects.StartDate != null) && (projects.StartDate.toString().indexOf(searchTerm) != -1))
      || ((projects.EndDate != null) && (projects.EndDate.toString().indexOf(searchTerm) != -1))
      || projects.UserID.toString().indexOf(searchTerm) != -1
      );
    }else{
      return projects;
    }
  }
}

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule,
                FormsModule,NgbAlertModule,NgSelect2Module,OrderModule],
      declarations: [ AddProjectComponent,ProjectFilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should reset values', () => {
    component.projectInfo = [ {
       ProjectID:3,
       ProjectName:'Test Project 2',
       StartDate: new Date(),
       EndDate: new Date(),
       Priority :10
    }];
      component.resetProject();
      expect(component.projectInfo).toEqual({});
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
