import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/Operators';

import { User } from 'src/app/models/user';
import { Observable, from } from 'rxjs';
import { Task } from 'src/app/models/task';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }
  //  baseUrl: string = 'http://172.18.1.109:8087/api/';
   baseUrl: string = 'http://localhost:50224/api/';

  //Add user data 
  addUser(userDetail: User):Observable<any> {
    return this.http.post(this.baseUrl+'AddUser', userDetail).pipe(map(response => { return response;}));
  }

  // update user data
  updateUser(userDetail: User):Observable<any> {
    return this.http.put(this.baseUrl+'UpdateUser', userDetail).pipe(map(response => {return response;}));
  }

  //delete user
  deleteUser(id: any):Observable<any> {
    return this.http.delete(this.baseUrl+'DeleteUser/' + id).pipe(map((response) => {return response;}));
  }
  
  // Get all user list
  getAllUser(): Observable<any> {
    return this.http.get(this.baseUrl + 'GetAllUser').pipe(map(response => {return response;}));
  }

  //Add user data 
  addProject(projectDetail: Project):Observable<any> {
    return this.http.post(this.baseUrl+'AddProject', projectDetail).pipe(map(response => { return response;}));
  }

  updateProject(projectDetail: Project):Observable<any> {
    return this.http.put(this.baseUrl+'UpdateProject', projectDetail).pipe(map(response => {return response;}));
  }

  //delete the task
  deleteProject(id: any):Observable<any> {
    return this.http.delete(this.baseUrl+'DeleteProject/' + id).pipe(map((response) => {return response;}));
  }
  
  // Get the all task list
  getAllProject(): Observable<any> {
    return this.http.get(this.baseUrl + 'GetAllProject').pipe(map((response) => {return response;}));
  }

  //create new task 
  addTask(task: Task):Observable<any> {
    return this.http.post(this.baseUrl + 'AddTask', task).pipe(map((response) => {return response;}));
  }

  // update the task details
  updateTask(task: Task):Observable<any> {
    return this.http.put(this.baseUrl + 'UpdateTask', task).pipe(map((response) => { return response;}));
  }

  //delete the task
  deleteTask(id: any):Observable<any> {
    return this.http.delete(this.baseUrl + 'DeleteTask/' + id).pipe(map((response) => { return response;}));
  }

  //end the task 
  endTask(task:Task):Observable<any> {
    return this.http.put(this.baseUrl + 'EndTask',task).pipe(map((response) => {return response;}));
  }

  // Get the all task list
  getTasks(): Observable<any> {
    return this.http.get(this.baseUrl + 'GetAllTask').pipe(map((response) => {return response;}));
  }

  //get task detail by task id
  getTaskById(id : any):Observable<any> {
    return this.http.get(this.baseUrl + 'GetTask/' + id).pipe(map((response) => {return response;}));
  }
  //get task detail by task id
  getTaskByProjectId(id : any):Observable<any> {
    return this.http.get(this.baseUrl + 'GetTaskByProject/' + id).pipe(map((response) => {return response;}));
  }

  addParentTask(ParentTaskDetail:any):Observable<any>{
   return this.http.post(this.baseUrl + "AddParentTask",ParentTaskDetail).pipe(map(response =>{return response;}));  
  }

  getParenTask():Observable<any>{
    return this.http.get(this.baseUrl + "GetAllParentTask").pipe(map(response =>{return response;}));  
 
   }
  
  
  


}
