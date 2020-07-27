import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from 'src/app/_services';
@Component({
  selector: 'app-createplay-list',
  templateUrl: './createplay-list.component.html'
})
export class CreateplayListComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  playLists = [];


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.accountService.getPlayList().subscribe(res => {
      console.log(res);

    })

    this.form = this.formBuilder.group({
      'userId': this.formBuilder.control('', [Validators.required]),
      'playListName': this.formBuilder.control('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    });

    if (!this.isAddMode) {
      this.accountService.getById(this.id)
        .subscribe(x => {
          this.f.playListId.setValue(x.playListId);
          this.f.playListName.setValue(x.playListName);

        });
    }

  }
  get f() { return this.form.controls; }

  onSubmit() {
    console.log(this.form);
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    if (this.isAddMode) {
      this.createPlayList();
    }
    else {
      this.updatePlayList();
    }


  }


  private createPlayList() {
    this.accountService.AddPlayList(this.f.userId.value, this.f.playListName.value)
      .subscribe(
        data => {
          this.alertService.success('PlayList added successfully', { keepAfterRouteChange: true });
          this.router.navigate(['.', { relativeTo: this.route }]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }
  private updatePlayList() {
    var pid: number = +this.id;
    this.accountService.updateplayList(pid, this.f.userId.value, this.f.playListName.value)
      .subscribe(
        res => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['..', { relativeTo: this.route }]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
