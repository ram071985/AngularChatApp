import { Component, OnInit, Input } from '@angular/core';
import { UserReturn } from '../../models/user-return.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
    @Input() userList: UserReturn[] = [];

    constructor() {}

    ngOnInit(): void {

    }
}