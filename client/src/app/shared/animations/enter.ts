import {animate, style, transition, trigger} from "@angular/animations";

export const enterAnimation =
  trigger('enter', [
    transition(':enter', [
      style({transform: 'scale(0)'}),
      animate('185ms ease', style({transform: 'scale(1)'}))
    ]),
  ])
