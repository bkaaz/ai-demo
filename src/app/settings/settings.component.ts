import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  themes = ['Light', 'Dark', 'System'];

  settingsForm = this.fb.group({
    name: ['John Doe', [Validators.required, Validators.minLength(3)]],
    email: ['john@example.com', [Validators.required, Validators.email]],
    notifications: [true],
    theme: ['Light'],
  });

  onSubmit(): void {
    if (this.settingsForm.valid) {
      this.snackBar.open('Settings saved successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    } else {
      this.settingsForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.settingsForm.reset({
      name: 'John Doe',
      email: 'john@example.com',
      notifications: true,
      theme: 'Light',
    });
  }
}
