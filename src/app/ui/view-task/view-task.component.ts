import {Component,OnInit} from '@angular/core';
import {Task } from 'src/app/models/task';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styles: []
})
export class ViewTaskComponent implements OnInit {
  
  tasksdata:Task[];
  successMessage:string;
  noRecordFound:string ;
  projectdata:Project[];
  ProjectID:any =-1;
  title: string = "View Task Details";
  sortColumn:string = "Priority";
  reverseSort:boolean= false;
 
  constructor(private projectService:ProjectService,private router:Router) {}

  ngOnInit() {
    this.projectService.getAllProject().subscribe(response => {
      this.projectdata = response;
    });

    this.projectService.getTasks().subscribe( (response) =>{
      this.tasksdata = response;
      });
  }
     
  selectChangeHandler(event:any){
    this.ProjectID = event.value;

    if(this.ProjectID!= undefined){
      this.projectService.getTaskByProjectId(this.ProjectID).subscribe( (response) =>{
        this.tasksdata = response;
        if(response.length == 0){
         this.noRecordFound = "No Records Found.";
        }else{
          this.noRecordFound= null;
         this.successMessage = "";
         }
     });
    }
  }

  editTask(taskId:string){
    this.router.navigate(['update-task/'+ taskId] );
  }

  endTask(task:any){
    this.projectService.endTask(task).subscribe(resp =>{
      this.successMessage = "Task has been End successfully."
      setTimeout(() => this.successMessage = null, 3000);
      this.tasksdata = resp;
    });
  }

  deleteTask(taskId:string){
    this.projectService.deleteTask(taskId).subscribe(resp =>{
      this.successMessage = "Task has been deleted successfully."
      setTimeout(() => this.successMessage = null, 3000);
      this.tasksdata = resp;
     
    });
  }

  sortTasks = function(column:string){
    this.reverseSort = this.sortColumn == column ? !this.reverseSort : false ;
    this.sortColumn = column
  }

  
}
