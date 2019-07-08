import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styles: []
})
export class AddUserComponent implements OnInit {

  userDetail: any = {};
  users: User[];
  btnText: string = "Add";
  edited: boolean = false;
  message: string;
  type: any;
  title: string = "Add User Details";
  sortColumn: string = "EmployeeID";
  reverseSort: boolean = true;
  searchText: any;
  errors: string[] = [];
  invalid: boolean = false;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.getuserdata();
  }

  getuserdata() {
    this.projectService.getAllUser().subscribe(resp => {
      this.users = resp;
    });
  }

  onSubmitForm(form: NgForm) {
    if (this.validateForm(form)) {
      if (this.edited) {
        this.projectService.updateUser(this.userDetail)
          .subscribe(response => {
            this.message = response;
            this.type = "success";
            this.getuserdata()
            setTimeout(() => this.message = null, 3000);
            this.resetUser();
          });
      } else {
        this.projectService.addUser(this.userDetail)
          .subscribe(response => {
            this.users = response;
            this.message = "User added successfully";
            this.type = "success";
            setTimeout(() => this.message = null, 3000);
            this.resetUser();
          });
      }
    }
  }

  editUser(userid: any) {
    this.message = null
    this.title = "Edit User Details";
    this.btnText = "Update";
    this.edited = true;
    this.userDetail = { ...this.users.find(x => x.UserID == userid) };
  }

  deleteUser(userId: any) {
    this.projectService.deleteUser(userId)
      .subscribe(response => {
        if (response.IsSuccess) {
          this.users = response.UserList;
          this.message = "User has been deleted successfully";
          this.type = "success";
        } else {
          this.type = "danger";
          this.message = "User can not be deleted. First unassigned all projects and task.";
        }
        setTimeout(() => this.message = null, 3000);
      })
  }

  validateForm(form: any) {
    this.errors = [];
    if (form.controls['firstName'].invalid || form.value.firstName == null) {
      this.errors.push("First Name is required field.")
    }
    if (form.controls['lastName'].invalid || form.value.firstName == null) {
      this.errors.push("Last Name is required field.")
    }
    if (form.controls['employeeId'].invalid || form.value.firstName == null) {
      this.errors.push("EmployeeId is required field.")
    }

    if (this.errors.length > 0) {
      this.invalid = true;
      return false;
    } else {
      this.invalid = false;
      return true;
    }
  }

  cancel() {
    this.resetUser()
  }

  resetUser() {
    this.btnText = "Add";
    this.title = "Add User Details";
    this.edited = false;
    this.userDetail = {};
    this.errors = [];
    this.invalid = false;
  }

  sortUsers = function (column: string) {
    this.reverseSort = this.sortColumn == column ? !this.reverseSort : false;
    this.sortColumn = column
  }

  getSortClass = function (column: string) {
    if (this.sortColumn == column) {
      return this.reverseSort ? 'sorting_desc' : 'sorting_asc';
    }
    return '';
  }

}
