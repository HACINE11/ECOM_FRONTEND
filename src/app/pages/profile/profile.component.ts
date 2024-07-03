import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import notify from 'devextreme/ui/notify';

export interface IUser {
  email: string;
  avatarUrl?: string;
  nom?: string;
  prenom?: string;
  entreprise?: string;
  matriculeFiscal?: string;
  address?: string;
  mobile?: number;
  role?: string;
  
}

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user:Partial <IUser>= {};
  colCountByScreen: object;
  idUser!: string;
  loading = false;

  constructor(private authService: AuthService) {
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.idUser = decoded.id;
        

        this.authService.getUserProfile(this.idUser).subscribe(data => {
          this.user= {

            nom:data.nom,
            prenom: data.prenom,
            entreprise: data.entreprise,
            address: data.address,
            mobile: data.mobile
          }
           //console.log('affiche PROFILE USER', this.user);
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found');
    }
  }

  updateUser() {
    this.loading = true;
    this.authService.updateUserProfile(this.idUser, this.user).subscribe(
      data => {
        this.loading = false;
        //console.log('Updated user data:', data);
        notify('Profile updated successfully', 'success', 2000);
      },
      error => {
        this.loading = false;
        console.error('Error updating profile:', error);
        notify('Error updating profile', 'error', 2000);
      }
    );
  }
}

 