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


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.accountService.getSongsInPlayList().subscribe(res => {
      console.log(res);

    })

    this.form = this.formBuilder.group({
      'songId': this.formBuilder.control('', [Validators.required]),
      'playListId': this.formBuilder.control('', [Validators.required]),
      'userId': this.formBuilder.control('', [Validators.required])
    });

    if (!this.isAddMode) {
      this.accountService.getById(this.id)
        .subscribe(x => {
          this.f.songId.setValue(x.songId);
          this.f.playListId.setValue(x.playListId);
          this.f.userId.setValue(x.userId);


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


  }
  private createPlayList() {
    this.accountService.AddSongInPlayList(this.f.id.value, this.f.songId.value, this.f.playListId.value, this.f.userId.value)
      .subscribe(
        data => {
          this.alertService.success('Songs added successfully', { keepAfterRouteChange: true });
          this.router.navigate(['.', { relativeTo: this.route }]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }


}
