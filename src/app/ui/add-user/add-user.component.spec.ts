import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {Pipe, PipeTransform} from '@angular/core';
import { User } from 'src/app/MODELS/user';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { NgSelect2Module } from 'ng-select2';
import { OrderModule } from 'ngx-order-pipe';

@Pipe({
  name: 'userfilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(users: User[], searchTerm:string): User[] {
    if (users && users.length && searchTerm) {
      return users.filter(user=>
        user.FirstName.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) != -1
      || user.LastName.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) != -1
      || user.EmployeeID.toString().indexOf(searchTerm) != -1 );
    }else{
      return users;
    }
  }

}

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule,
                FormsModule,NgSelect2Module,NgbAlertModule,OrderModule ],
      declarations: [ AddUserComponent ,UserFilterPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'resetUser')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resetUser',()=>{
    
    component.resetUser();
    expect(component.userDetail).toBeDefined();
    
  });

  it('user edit',()=>{
    component.users = 
    [{

      UserID:2, FirstName: 'Rahul', LastName: 'Kumar', EmployeeID: 1002
    }]
    component.editUser({UserID:2, FirstName: 'Rahul', LastName: 'Kumar', EmployeeID: 1002 });
    expect(component.edited).toBeTruthy();
  });

  it('delete user',()=>{
    component.users = 
    [{
      UserID:15, FirstName: 'Rahul3', LastName: 'Singh', EmployeeID: 1006
    }]
    component.deleteUser({UserID:15, FirstName: 'Rahul3', LastName: 'Singh', EmployeeID: 1006 });
    expect(component.edited).toBeFalsy();
    
  });

  it('sort user by FirstName',()=>{
    component.users = 
    [{
      UserID:1, FirstName: 'Karan', LastName: 'Singh', EmployeeID: 1001
    }]
   
    component.sortUsers('FirstName');
    expect(component.reverseSort).toEqual(false);
  });
});
