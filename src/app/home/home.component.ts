import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import axios from 'axios';
import { register } from 'swiper/element/bundle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { Router } from '@angular/router';
import { authService } from 'src/app/service/auth.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from 'src/header/header.component';

import { logIn, logOut } from 'ionicons/icons';
import { UserModalComponent } from '../user-modal/user-modal.component';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
register();
@Component({
  selector: 'home-app',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    HeaderComponent,
    FooterComponent,
    TranslateModule,
    MatSlideToggleModule,
    MatDialogModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  constructor(
    public dialog: MatDialog,
    private authService: authService,
    private router: Router
  ) {
    addIcons({
      logIn,
      logOut,
    });
  }
  images: string[] = [];
  showLoginBtn: boolean = true;
  showLogOutBtn: boolean = false;

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  async ngOnInit() {
    await this.authService.userDataState();
    this.checkLogin();
    const response: any = await axios.get(
      'https://dog.ceo/api/breeds/image/random/5'
    );
    for (let i = 0; i < 5; i++) {
      this.images.push(response.data.message[i]);
    }
  }

  async logout() {
    try {
      // Limpiar el token del localStorage
      localStorage.removeItem('token');

      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
      // Manejar errores
      throw error;
    }
  }
  async checkLogin() {
    if (await this.authService.isIoggedIn()) this.showLoginBtn = false;
    this.showLogOutBtn = true;
  }
  async openUserDialog() {
    const user = await this.authService.getUserData();
    const dialogRef = this.dialog.open(UserModalComponent, {
      data: { name: user.name, email: user.email },
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
