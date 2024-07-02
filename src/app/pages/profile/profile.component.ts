import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { jwtDecode } from 'jwt-decode';

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
  _user!: IUser;
  colCountByScreen: object;

  idUser!: string;

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
          this._user = data;
          console.log('PROFILE USER', this._user);
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found');
    }
  }


  updateUser(){
    this.authService.updateUserProfile(this.idUser, this._user ).subscribe(data => {
      console.log("data", data);
    })
  }
}

 