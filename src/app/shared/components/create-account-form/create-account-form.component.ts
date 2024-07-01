import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ValidationCallbackData } from 'devextreme-angular/common';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';


@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})

export class CreateAccountFormComponent {
  
  loading = false;
  formData: any = {
    email: '',
    motPasse: '',
    confirmedPassword: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

 onSubmit(e: Event) {
    e.preventDefault();
    const { email, motPasse, confirmedPassword } = this.formData;
    if (motPasse !== confirmedPassword) {
      notify('!!! Passwords do not match', 'error', 2000);
      return;
    }
       
    this.loading = true;
    this.authService.createAccount(email, motPasse).subscribe(result => {
      this.loading = false;
      if (!result.isOk) {
        notify(result.message, 'error', 2000);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  confirmPassword = (e: any) => {
    return e.value === this.formData.motPasse;
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [ CreateAccountFormComponent ],
  exports: [ CreateAccountFormComponent ]
})
export class CreateAccountFormModule { }
