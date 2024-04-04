import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  standalone: true,
})
export class UserModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; email: string }
  ) {}

  ngOnInit() {}
}
