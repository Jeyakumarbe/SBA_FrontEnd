import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { DataTablesModule  } from 'angular-datatables' ;
import { AppRoutingModule } from './app-routing.module';
import { NgSelect2Module } from 'ng-select2';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { AddProjectComponent } from './ui/add-project/add-project.component';
import { AddTaskComponent } from './ui/add-task/add-task.component';
import { AddUserComponent } from './ui/add-user/add-user.component';
import { ViewTaskComponent } from './ui/view-task/view-task.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { UserfilterPipe } from './pipes/userfilter.pipe';
import { OrderModule } from 'ngx-order-pipe';
import { ProjectfilterPipe } from './pipes/projectfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    AddProjectComponent,
    AddTaskComponent,
    AddUserComponent,
    ViewTaskComponent,
    UserfilterPipe,
    ProjectfilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    NgSelect2Module,
    NgbAlertModule,
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
