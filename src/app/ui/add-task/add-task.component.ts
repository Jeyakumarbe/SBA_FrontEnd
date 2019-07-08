import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Task } from 'src/app/models/task';
import { Parenttask } from 'src/app/models/parenttask';
import { Router,ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router/src/shared';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styles: []
})
export class AddTaskComponent implements OnInit {

  taskInfo: any = {
    Priority: 0,
    ProjectID: -1,
    UserID: -1,
    ParentID: -1
  };
  parentTaskList: any[];
  projectdata: any[];
  usersdata: any[];
  IsParentTask: boolean;
  ptask: any;
  taskIdEdited:string;
  parentTaskDetails: Parenttask = {
    ParentID: 0,
    ParentTaskName: null
  };
  userDetail:User;
  btnText:string = "Add Task";
  edited:boolean =false;
  title: string = "Add Task Details";
  errors: string[] = [];
  invalid: boolean = false;

  constructor(private projectService: ProjectService,private router: Router,private activatedRoute :ActivatedRoute) { }

  ngOnInit() {
    this.projectService.getAllProject().subscribe(resp => {
      this.projectdata = resp;
      console.log("Project list", resp)
    });

    this.projectService.getParenTask().subscribe(response => {
      this.parentTaskList = response;
    });

    this.projectService.getAllUser().subscribe(response => {
      this.usersdata = response;
    });
    this.activatedRoute.params.subscribe((queryParms :Params) => {
      this.taskIdEdited = queryParms.id
    })

    if(this.taskIdEdited != undefined){
      this.title = "Edit Task Details";
      this.btnText = "Update Task";
      this.edited = true;
      this.projectService.getTaskById(this.taskIdEdited).subscribe(response =>{
           this.taskInfo = response;
           console.log("Edit task",response)
           this.taskInfo.StartDate = this.taskInfo.StartDate.substr(0,10);
           this.taskInfo.EndDate = this.taskInfo.EndDate.substr(0,10);
      });
    }else{
      this.setDateDefault();
    }
  }

  onSubmitTask(form: NgForm) {
   if(this.validateForm(form)){
    if (this.IsParentTask) {
      this.parentTaskDetails.ParentTaskName = this.taskInfo.TaskName;
      this.projectService.addParentTask(this.parentTaskDetails).subscribe(response => {
        this.parentTaskList = response;
      });
      this.IsParentTask = false;
      this.taskInfo.TaskName = '';
    } else {
      if(this.edited ){
        this.projectService.updateTask(this.taskInfo).subscribe(response => {
          this.router.navigate(['view-task']);
         });
      }else{
        this.projectService.addTask(this.taskInfo).subscribe(response => {
          this.router.navigate(['view-task']);
       });
      }
    }
   }
  }

  validateForm(form: any) {
    this.errors = [];
    if (form.controls['taskName'].invalid || form.value.taskName == null) {
      this.errors.push("Task Name is required field.")
    }
    if(!this.IsParentTask){
      if (!this.edited && form.value.projectid == "-1") {
        this.errors.push("Project Name is required field.")
      }
      if (form.value.priority == 0) {
        this.errors.push("Priority is required field.")
      }
      if (form.value.startDate == null || form.value.endDate == null) {
        this.errors.push("Start date and end date is required field.")
      }else if (form.value.startDate > form.value.endDate) {
        this.errors.push("Start date must be before the end date.")
      }
      if (!this.edited && form.value.userId == "-1") {
        this.errors.push("User Name is required field.")
      }
    }
    if (this.errors.length > 0) {
      this.invalid = true;
      return false;
    } else {
      this.invalid = false;
      return true;
    }
  }

  IsParentTaskClick() {
    this.taskInfo.ProjectID = -1;
    this.taskInfo.ParentID = -1;
    this.taskInfo.Priority= 0;
    this.taskInfo.UserID = -1;
  }
  reset() {
    this.taskInfo.ProjectID= -1;
    this.taskInfo.ParentID = -1;
    this.taskInfo.TaskName ='';
    this.taskInfo.Priority= 0;
    this.taskInfo.UserID = -1;
    this.setDateDefault();
    this.edited = false;
    this.title = "Add Task Details";
    this.errors = [];
    this.invalid = false;
  }
  cancel(){
    this.router.navigate(['view-task']);
  }

  setDateDefault(){
    this.taskInfo.StartDate = new Date().toISOString().split('T')[0];
    this.taskInfo.EndDate = new Date();
    this.taskInfo.EndDate.setDate(this.taskInfo.EndDate.getDate() + 1);
    this.taskInfo.EndDate = this.taskInfo.EndDate.toISOString().split('T')[0];
  }
}
