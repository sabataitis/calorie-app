import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserState} from "../../store/state";
import {Store} from "@ngrx/store";
import {StoreActions, StoreSelectors} from "../../store";
import {GOALS, GOALS_LT} from "../../shared/enum/goals.enum";
import {AuthUserDTO} from "../../shared/dto/user.dto";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivitiesConst} from "../../shared/constants/activities.const";
import {GoalsConst} from "../../shared/constants/goals.const";
import {FormulasConst} from "../../shared/constants/formulas.const";
import {enterAnimation} from "../../shared/animations/enter";
import {ACTIVITY_FACTOR_LT} from "../../shared/enum/activity-factor.enum";
import {getInputErrorClasses} from "../../shared/utils/get-input-error-classes";

@Component({
  selector: 'calorie-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    enterAnimation
  ]
})
export class ProfileComponent implements OnInit {
  userState$: Observable<UserState>
  profileForm: FormGroup;
  user: AuthUserDTO;
  editMode: boolean = false;

  activities = ActivitiesConst;
  goals = GoalsConst;
  formulas = FormulasConst;

  GOALS_LT = GOALS_LT
  ACTIVITY_FACTOR_LT = ACTIVITY_FACTOR_LT;

  constructor(private store: Store, private fb: FormBuilder) {
    this.userState$ = this.store.select(StoreSelectors.selectUserState);
  }

  ngOnInit(): void {
    this.subscribeToUserState();
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  getErrorClasses(field: string){
    return getInputErrorClasses(field, this.profileForm);
  }

  submitForm(): void {
    if(this.profileForm.dirty && !this.profileForm.pristine){
      this.store.dispatch(StoreActions.updateProfile({payload: this.profileForm.getRawValue()}));
      this.store.dispatch(StoreActions.getCurrentUser());
    }
    this.editMode = false;
  }

  private subscribeToUserState(): void {
    this.userState$.subscribe((userState: UserState) => {
      if (userState.success) {
        this.user = userState.current;

        this.profileForm = this.fb.group({
          height: [this.user.height, [Validators.required, Validators.min(54), Validators.max(272), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
          weight: [this.user.weight, [Validators.required, Validators.min(2), Validators.max(635), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
          age: [this.user.age, [Validators.required, Validators.min(1), Validators.max(120)]],
          activity: [this.user.activity, [Validators.required]],
          goal: [this.user.goal, [Validators.required]],
          goalNum: [this.user.goalNum],
          formula: [this.user.formula || FormulasConst[0], [Validators.required]]
        })

        if(this.profileForm.get('goal').value === GOALS.MAINTAIN){
          this.profileForm.get('goalNum').disable();
          this.profileForm.get('goalNum').setErrors(null);
          this.profileForm.get('goal').setErrors(null);
        }
        this.subscribeToGoalValueChanges();
      }
    })
  }
  private subscribeToGoalValueChanges(): void{
    this.profileForm.get('goal').valueChanges.subscribe(value=>{
      if(value !== GOALS.MAINTAIN){
        this.profileForm.get('goalNum').setValidators([Validators.required, Validators.min(1), Validators.max(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
        this.profileForm.get('goalNum').enable();
        this.profileForm.get('goalNum').markAllAsTouched();
      } else{
        this.profileForm.get('goalNum').disable();
        this.profileForm.get('goalNum').setErrors(null);
        this.profileForm.get('goal').setErrors(null);
      }
    })
  }

}
