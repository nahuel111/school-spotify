import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SpotifyAccountService} from '../../services/spotify-account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: SpotifyAccountService,
    private route: ActivatedRoute,
    private router: Router) { }
    loading:boolean = true;

  async ngOnInit() {
    const code: string = this.route.snapshot.queryParamMap.get('code');
    if(code){
       await this.accountService.callback();
       this.accountService.userAccount$.emit(localStorage.getItem("userName"));      
       this.router.navigate(['/songList']);
    }

    localStorage.removeItem("userName")
    this.loading = false;
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  async onSubmit() {
    localStorage.setItem('userName', this.userForm.controls.userName.value);
   await this.accountService.login();
  }

}
