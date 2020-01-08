import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SpotifyAccountService} from '../../services/spotify-account.service';

import { Observable, from, pipe, of } from 'rxjs';
import { switchMap, debounceTime, catchError, delay } from 'rxjs/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  searchField: FormControl;


   get parentId(): FormControl {
    return this.userForm.get("search") as FormControl;
}

  constructor(
    private formBuilder: FormBuilder,
    private accountService: SpotifyAccountService,
    private route: ActivatedRoute,
    private router: Router) {}
    loading:boolean = true;

  async ngOnInit() {

    this.loading = false;
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      search: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });

    /**
     * prueba switchMap */  
    this.userForm.controls.userName.valueChanges.pipe(
      debounceTime(400),

      switchMap(id => {
        console.log(id);
        console.log("sad1", id)
        return this.accountService.switchMap(id);
      })
    )
    .subscribe((res) =>{
      console.log("sad2", res)
    } );


    const code: string = this.route.snapshot.queryParamMap.get('code');
    if(code){
       this.accountService.callback();
       this.accountService.userAccount$.emit(localStorage.getItem("userName"));      
       this.router.navigate(['/songList']);
    }

  }

  async onSubmit() {
  
    localStorage.setItem('userName', this.userForm.controls.userName.value);
   await this.accountService.login();

    }




}
