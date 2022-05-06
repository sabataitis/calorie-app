import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {Store} from "@ngrx/store";

import {StoreActions, StoreSelectors} from '../../store/index'
import {Observable} from "rxjs";
import {UsernamesState} from "../../store/state";
import {animate, style, transition, trigger} from "@angular/animations";
import {ACTIVITY_FACTOR} from "../../shared/enum/activity-factor.enum";
import {GOALS} from "../../shared/enum/goals.enum";

type TextValue = { text: string, value: string };

export interface Wizard {
  "step_one": boolean,
  "step_two": boolean,
  "step_three": boolean
}

@Component({
  selector: 'calorie-app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('enter', [
      transition(':enter', [
        style({transform: 'scale(0)'}),
        animate('185ms ease', style({transform: 'scale(1)'}))
      ]),
    ]),
  ]
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  usernames$: Observable<UsernamesState>;
  usernames: String[];

  wizard: Wizard = {
    "step_one": true,
    "step_two": false,
    "step_three": false,
  };

  goals: TextValue[] = [
    {text: 'Palaikyti svorį', value: GOALS.MAINTAIN},
    {text: 'Numesti svorio', value: GOALS.LOOSE},
    {text: 'Priaugti svorio', value: GOALS.GAIN},
  ];

  activities: TextValue[] = [
    {text: 'Sėdimas darbas ir pasyvus laisvalaikis', value: ACTIVITY_FACTOR.SEDENTARY},
    {text: 'Sėdimas arba lengvas darbas ir nedidelis fizinis aktyvumas', value: ACTIVITY_FACTOR.LIGHT},
    {text: 'Vidutinio sunkumo darbas ir vidutinis/aktyvus laisvalaikis', value: ACTIVITY_FACTOR.MODERATE},
    {text: 'Sunkus darbas ir vidutinis/aktyvus laisvalaikis', value: ACTIVITY_FACTOR.HIGH},
  ];

  constructor(private userService: UserService, private fb: FormBuilder, private store: Store) {
    this.usernames$ = this.store.select(StoreSelectors.selectUsernamesState);
    this.createRegisterForm();
    this.subscribeToUsernamesState();
  }

  ngOnInit() {
    this.store.dispatch(StoreActions.getUsernames());
  }

  hasErrorsAndTouched(field: string): boolean {
    return this.registerForm.get(field).errors && this.registerForm.get(field).touched;
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
    })
  }

  private subscribeToUsernamesState(): void {
    this.usernames$.subscribe((state: UsernamesState) => {
      if (state.success) {
        this.usernames = state.usernames;
      }
    })

  }
}
