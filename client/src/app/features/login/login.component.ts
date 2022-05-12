import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {StoreActions} from "../../store";
import {getInputErrorClasses} from "../../shared/utils/get-input-error-classes";

@Component({
  selector: 'calorie-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.createLoginForm();
  }

  getErrorClasses(field: string){
    return getInputErrorClasses(field, this.loginForm);
  }

  async submitForm(): Promise<void>{
    if(this.loginForm.valid){
        this.store.dispatch(StoreActions.login(this.loginForm.getRawValue()));
    }
  }

  private createLoginForm(): void{
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

}
