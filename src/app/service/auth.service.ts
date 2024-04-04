import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import axios from 'axios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class authService {
  userData: any;

  constructor(
    private router: Router,
    
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async login(email: any, password: any) {
    try {
      const response = await axios.post(
        `${environment.develoment}/auth/login`,
        {
          email,
          password,
        }
      );
      // Guardar el token
      this.setToken(response.data.accessToken);
      return true
    } catch (error) {
      console.log(error);
      // Manejar errores
      throw error;
    }
  }

  async isIoggedIn() {
    // Verificar si hay un token guardado
    return !!this.getToken();
  }

  // Guardar el token
  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
  setUserData(userData: any) {
    this.userData = userData;
    return this.userData;
  }

  // Obtener los datos del usuario guardados en userData
  getUserData(): any {
    return this.userData ?? '';
  }

  async userDataState() {
    try {
      const token = this.getToken();

      if (!token) return false;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${environment.develoment}/auth/profile`,
        config
      );
      this.setUserData(response.data.user);
      return response.data.user;
    } catch (error) {
      console.log(error);
      // Manejar errores
      return false;
    }
  }
}
