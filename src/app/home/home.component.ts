import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';
import { AccountService } from 'src/app/_services';
import { Validators, FormControl, FormGroup } from '@angular/forms';


@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']

})
export class HomeComponent implements OnInit {
    user: User;
    userForm: FormGroup;
    users = null;


    constructor(private accountService: AccountService) {
        this.accountService.getSongs()
            .subscribe(users => {
                this.users = users;
                console.log(this.users);
            });

    }

    ngOnInit(): void {

    }



}