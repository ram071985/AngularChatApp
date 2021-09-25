import { Component, Input, OnInit } from '@angular/core';
import { UserReturn } from '../models/user-return.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userList: UserReturn[] = [];
  constructor(private usersService: UsersService) {}

 

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((data: UserReturn[]) => {
      this.userList = data;
    });
  }
}
