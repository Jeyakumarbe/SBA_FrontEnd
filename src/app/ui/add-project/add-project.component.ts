import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Task } from 'src/app/models/task';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styles: []
})
export class AddProjectComponent implements OnInit {

  projectInfo: any = {
    Priority: 0,
    UserID: "-1"
  };
  projectsdata: Project[];
  usersdata: User[];
  tasksdata: Task[];
  projectId: any;
  edited: boolean = false;
  IsDateRequired: boolean = false;
  btnText: string = "Add";
  title: string = "Add Project Details";
  successMessage: string;
  noRecordFound: string;
  sortColumn: string = "Priority";
  reverseSort: boolean = true;
  searchText: any;
  errors: string[] = [];
  invalid: boolean = false;

  constructor(private projectService: ProjectService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getProjectData();
    this.projectService.getAllUser().subscribe(response => {
      this.usersdata = response;
    });
    this.projectService.getTasks().subscribe(response => {
      this.tasksdata = response;
    });
  }
  //To get project list 
  getProjectData() {
    this.projectService.getAllProject().subscribe(response => {
      this.projectsdata = response;
      this.emptyTable(response.length);
    });
  }
  //add/update the project details
  onSubmitProject(form: NgForm) {
    console.log("formdata", form)

    if (this.validateForm(form)) {
      if (this.edited) {
        this.projectService.updateProject(this.projectInfo).subscribe(response => {
          this.successMessage = "Project has been updated successfully.";
          this.getProjectData();
          setTimeout(() => this.successMessage = null, 3000);
          this.resetProject();
        });
      } else {
        this.projectService.addProject(this.projectInfo).subscribe(response => {
          this.projectsdata = response;
          this.successMessage = "Project has been added successfully.";
          setTimeout(() => this.successMessage = null, 3000);
          this.resetProject();
        });
      }
    }
  }

  editProject(project: any) {
    this.title = "Edit Project Details";
    this.btnText = "Update";
    this.edited = true;
    this.projectInfo = { ...this.projectsdata.find(x => x.ProjectID == project.ProjectID) };

    if (project.StartDate == null) {
      this.IsDateRequired = false;
    } else {
      this.IsDateRequired = true;
      this.projectInfo.StartDate = this.projectInfo.StartDate.substr(0, 10);
      this.projectInfo.EndDate = this.projectInfo.EndDate.substr(0, 10);
    }
  }
  //Use to delete the project
  deleteProject(projectId: any) {
    this.projectService.deleteProject(projectId).subscribe(response => {
      this.projectsdata = response;
      this.successMessage = "Project has been suspended successfully.";
      setTimeout(() => this.successMessage = null, 3000);
      this.emptyTable(response.length);
    });
  }

  validateForm(form: any) {
    this.errors = [];
    if (form.controls['projectName'].invalid || form.value.projectName == null) {
      this.errors.push("Project Name is required field.")
    }
    if (form.value.IsDateRequired && form.value.startDate > form.value.endDate) {
      this.errors.push("Start date must be before end date.")
    }
    if (form.value.priority == 0) {
      this.errors.push("Priority is required field")
    }
    if (form.value.userId == "-1") {
      this.errors.push("Manager Name is required field.")
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
    this.resetProject();
  }

  resetProject() {
    this.projectInfo = { Priority: 0, UserID: "-1" };
    this.btnText = "Add";
    this.title = "Add Project Details";
    this.edited = false;
    this.IsDateRequired = false;
    this.errors = [];
    this.invalid = false;
    // this.successMessage = null;
  }
  //To get the no of task in project
  getNoofTask(projectid: any) {
    if (this.tasksdata != undefined) {
      return this.tasksdata.filter(p => p.ProjectID == projectid).length;
    } else {
      return 0;
    }
  }
  // to get the completed task for project
  getcompletedTask(projectid: any) {
    if (this.tasksdata != undefined) {
      return this.tasksdata.filter(p => p.ProjectID == projectid && p.Status == false).length;
    } else {
      return 0;
    }
  }

  setdate(daterequired: boolean) {
    if (daterequired) {
      this.setDateDefault()
    } else {
      this.projectInfo.StartDate = null;
      this.projectInfo.EndDate = null;
    }
  }
  //display message if table is empty
  emptyTable(length: number) {
    if (length > 0) {
      this.noRecordFound = null;
    } else {
      this.noRecordFound = "No Records Found";
    }
  }

  setDateDefault() {
    this.projectInfo.StartDate = new Date().toISOString().split('T')[0];
    this.projectInfo.EndDate = new Date();
    this.projectInfo.EndDate.setDate(this.projectInfo.EndDate.getDate() + 1);
    this.projectInfo.EndDate = this.projectInfo.EndDate.toISOString().split('T')[0];
  }
  // sort the project data
  sortProjects = function (column: string) {
    this.reverseSort = this.sortColumn == column ? !this.reverseSort : false;
    this.sortColumn = column
  }
  // add class for sorted data
  getSortClass = function (column: string) {
    if (this.sortColumn == column) {
      return this.reverseSort ? 'sorting_desc' : 'sorting_asc';
    }
    return '';
  }

}
