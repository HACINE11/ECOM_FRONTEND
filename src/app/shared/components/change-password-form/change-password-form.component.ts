import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ValidationCallbackData } from 'devextreme-angular/common';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';


@Component({
  selector: 'app-change-passsword-form',
  templateUrl: './change-password-form.component.html'
})
export class ChangePasswordFormComponent implements OnInit {
  loading = false;
  formData: any = {};
  recoveryCode: string = '';

  constructor(private authService: AuthService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.recoveryCode = params.get('token') || '';
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const { motPasse } = this.formData;
    this.loading = true;

    this.authService.changePassword(this.recoveryCode, motPasse).subscribe(result => {
      this.loading = false;
      if (result.isOk) 
        { this.router.navigate(['/login-form']);
          notify(result.message, 'success', 2500);
        } 
      else { 
        notify(result.message, 'error', 2000);    
      }
    });
  }

  confirmPassword = (e: ValidationCallbackData) => {
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
  declarations: [ ChangePasswordFormComponent ],
  exports: [ ChangePasswordFormComponent ]
})
export class ChangePasswordFormModule { }
