import { Component } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  formData: any = {};
  loading = false;

  

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
   // e.preventDefault();
    const { email, code } = this.formData;
    this.loading = true;

    this.authService.verifyAccount(email, code).subscribe(result => {
      this.loading = false;
      if (result.isOk) {
        notify('Account verified successfully', 'success', 2000);
        this.router.navigate(['/login']);
      } else {
        notify(result.message, 'error', 2000);
      }
    });
  }

}
