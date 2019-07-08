import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent} from 'src/app/ui/add-project/add-project.component';
import { AddTaskComponent} from 'src/app/ui/add-task/add-task.component';
import { AddUserComponent} from 'src/app/ui/add-user/add-user.component';
import { ViewTaskComponent} from 'src/app/ui/view-task/view-task.component';

const routes: Routes = [
  { path: '',redirectTo: "/add-project", pathMatch: 'full'},
  { path:'add-project' ,component: AddProjectComponent},
  { path:'update-project/:id' ,component: AddProjectComponent},
  { path:'add-task', component: AddTaskComponent},
  { path:'update-task/:id' ,component: AddTaskComponent},
  { path:'add-user' ,component: AddUserComponent},
  { path:'view-task',component:ViewTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
