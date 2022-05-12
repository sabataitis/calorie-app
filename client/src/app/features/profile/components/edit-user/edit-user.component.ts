import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthUserDTO} from "../../../../shared/dto/user.dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GOALS} from "../../../../shared/enum/goals.enum";
import {FormulasConst} from "../../../../shared/constants/formulas.const";
import {getInputErrorClasses} from "../../../../shared/utils/get-input-error-classes";
import {ActivitiesConst} from "../../../../shared/constants/activities.const";
import {GoalsConst} from "../../../../shared/constants/goals.const";

@Component({
  selector: 'calorie-app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @Input('user') user:AuthUserDTO;
  @Output() submitFormEvent= new EventEmitter<Partial<AuthUserDTO>>()

  constructor(private fb: FormBuilder) { }

  editUserForm: FormGroup;
  activities = ActivitiesConst;
  goals = GoalsConst;
  formulas = FormulasConst;

  ngOnInit(): void {
    this.createEditUserForm();
  }

  getErrorClasses(field: string){
    return getInputErrorClasses(field, this.editUserForm);
  }

  submitForm(): void{
    if(this.editUserForm.dirty && !this.editUserForm.pristine){
      this.submitFormEvent.emit(this.editUserForm.getRawValue());
    }
  }

  private createEditUserForm():void{
    this.editUserForm = this.fb.group({
      height: [this.user.height, [Validators.required, Validators.min(54), Validators.max(272), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      weight: [this.user.weight, [Validators.required, Validators.min(2), Validators.max(635), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      age: [this.user.age, [Validators.required, Validators.min(1), Validators.max(120)]],
      activity: [this.user.activity, [Validators.required]],
      goal: [this.user.goal, [Validators.required]],
      goalNum: [this.user.goalNum],
      formula: [this.user.formula || FormulasConst[0], [Validators.required]]
    })

    if(this.editUserForm.get('goal').value === GOALS.MAINTAIN){
      this.editUserForm.get('goalNum').disable();
      this.editUserForm.get('goalNum').setErrors(null);
      this.editUserForm.get('goal').setErrors(null);
    }

    this.subscribeToGoalValueChanges();
  }

  private subscribeToGoalValueChanges(): void{
    this.editUserForm.get('goal').valueChanges.subscribe(value=>{
      if(value !== GOALS.MAINTAIN){
        this.editUserForm.get('goalNum').setValidators([Validators.required, Validators.min(1), Validators.max(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
        this.editUserForm.get('goalNum').enable();
        this.editUserForm.get('goalNum').markAllAsTouched();
      } else{
        this.editUserForm.get('goalNum').disable();
        this.editUserForm.get('goalNum').setErrors(null);
        this.editUserForm.get('goal').setErrors(null);
      }
    })
  }

}
