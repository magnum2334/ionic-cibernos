import { Component, OnInit } from '@angular/core';
import { authService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../home/modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: authService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {}
  async openUserDialog() {
    const user = await this.authService.getUserData();
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { name: user.name, email: user.email },
      width: '400px',
    });
    
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
