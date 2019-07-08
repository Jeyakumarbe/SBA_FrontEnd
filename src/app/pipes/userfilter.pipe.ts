import { Pipe, PipeTransform } from '@angular/core';
import {User} from 'src/app/models/user';

@Pipe({
  name: 'userfilter'
})

export class UserfilterPipe implements PipeTransform {
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




  

  