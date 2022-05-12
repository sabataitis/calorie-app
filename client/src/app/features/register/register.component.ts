import {AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {Store} from "@ngrx/store";
import {StoreActions, StoreSelectors} from '../../store/index'
import {Observable} from "rxjs";
import {UsernamesState} from "../../store/state";
import {ACTIVITY_FACTOR} from "../../shared/enum/activity-factor.enum";
import {GOALS} from "../../shared/enum/goals.enum";
import {enterAnimation} from "../../shared/animations/enter";
import {GoalsConst} from "../../shared/constants/goals.const";
import {ActivitiesConst} from "../../shared/constants/activities.const";
import {getInputErrorClasses} from "../../shared/utils/get-input-error-classes";


export interface Wizard {
  "step_one": boolean,
  "step_two": boolean,
  "step_three": boolean
}

@Component({
  selector: 'calorie-app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [enterAnimation]
})

export class RegisterComponent implements OnInit, AfterContentChecked {
  registerForm: FormGroup;
  usernames$: Observable<UsernamesState>;
  usernames: String[];

  wizard: Wizard = {
    "step_one": true,
    "step_two": false,
    "step_three": false,
  };

  goals = GoalsConst;
  activities = ActivitiesConst;

  constructor(private userService: UserService, private fb: FormBuilder, private store: Store, private cd: ChangeDetectorRef) {
    this.usernames$ = this.store.select(StoreSelectors.selectUsernamesState);
    this.createRegisterForm();
    this.subscribeToUsernamesState();
  }

  ngOnInit() {
    this.store.dispatch(StoreActions.getUsernames());
    this.subscribeToGoalValueChanges();
  }
  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  getErrorClasses(field: string){
    return getInputErrorClasses(field, this.registerForm);
  }

  arePropertiesInvalid(p1: string, p2: string): boolean {
    return this.registerForm.get(p1).invalid || this.registerForm.get(p2).invalid;
  }

  next(currentStep: keyof Wizard, nextStep: keyof Wizard): void {
    if(currentStep == 'step_one'){
      if (this.usernames.includes(this.registerForm.get('username').value)) {
        this.registerForm.get('username').setErrors({notUnique: true});
      } else{
        this.wizard[currentStep] = false;
        this.wizard[nextStep] = true;
      }
    } else{
      this.wizard[currentStep] = false;
      this.wizard[nextStep] = true;
    }
  }

  async submitForm(): Promise<void> {
    if (this.registerForm.valid) {
      if (this.usernames.includes(this.registerForm.get('username').value)) {
        this.registerForm.get('username').setErrors({notUnique: true});
      } else {
        this.store.dispatch(StoreActions.register(this.registerForm.getRawValue()));
      }
    }
  }

  private createRegisterForm(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      gender: [null, [Validators.required]],
      age: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
      height: ['', [Validators.required, Validators.min(54), Validators.max(272), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      weight: ['', [Validators.required, Validators.min(2), Validators.max(635), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      activity: [null, [Validators.required]],
      goal: [null, [Validators.required]],
      goalNum: [null]
    })
  }

  private subscribeToUsernamesState(): void {
    this.usernames$.subscribe((state: UsernamesState) => {
      if (state.success) {
        this.usernames = state.usernames;
      }
    })
  }
  private subscribeToGoalValueChanges(): void{
    this.registerForm.get('goal').valueChanges.subscribe((control: string)=>{
      if(control !== GOALS.MAINTAIN){
        this.registerForm.get('goalNum').setValidators([Validators.required, Validators.min(1), Validators.max(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
      } else{
        this.registerForm.get('goalNum').setErrors(null);
        this.registerForm.get('goal').setErrors(null);
      }
    })
  }
}
