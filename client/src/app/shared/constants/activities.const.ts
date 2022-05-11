import {ACTIVITY_FACTOR} from "../enum/activity-factor.enum";
import {TextValue} from "../interfaces/text-value.interface";

export const ActivitiesConst: TextValue[] = [
  {text: 'Sėdimas darbas ir pasyvus laisvalaikis', value: ACTIVITY_FACTOR.SEDENTARY},
  {text: 'Sėdimas arba lengvas darbas ir nedidelis fizinis aktyvumas', value: ACTIVITY_FACTOR.LIGHT},
  {text: 'Vidutinio sunkumo darbas ir vidutinis/aktyvus laisvalaikis', value: ACTIVITY_FACTOR.MODERATE},
  {text: 'Sunkus darbas ir vidutinis/aktyvus laisvalaikis', value: ACTIVITY_FACTOR.HIGH},
];
