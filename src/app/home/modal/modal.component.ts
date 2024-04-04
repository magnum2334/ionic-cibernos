import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Importa el servicio AuthService
import { MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { authService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class ModalComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private authService: authService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
    try {
      const response = await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      this.dialogRef.close();
      if (response) {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error de autenticación:', error);
    }
  }
}
