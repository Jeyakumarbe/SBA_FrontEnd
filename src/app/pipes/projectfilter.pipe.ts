import { Pipe, PipeTransform } from '@angular/core';
import{Project} from '../models/project';

@Pipe({
  name: 'projectfilter'
})
export class ProjectfilterPipe implements PipeTransform {

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
