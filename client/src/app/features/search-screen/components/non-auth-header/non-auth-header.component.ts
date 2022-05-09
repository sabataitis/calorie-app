import {Component, Input} from '@angular/core';

@Component({
  selector: 'calorie-app-non-auth-header',
  templateUrl: './non-auth-header.component.html',
  styleUrls: ['./non-auth-header.component.scss']
})
export class NonAuthHeaderComponent {
  @Input('isAuthenticated') isAuthenticated: boolean;
}
