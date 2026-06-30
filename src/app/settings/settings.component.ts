import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const pw = group.get('newPassword')?.value;
  const confirm = group.get('confirmPassword')?.value;
  if (!pw && !confirm) return null;
  return pw === confirm ? null : { passwordMismatch: true };
}

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
    phone: ['', [Validators.pattern(/^(\+48)?\d{7,15}$/)]],
    bio: ['', [Validators.maxLength(200)]],
    changePassword: this.fb.group(
      { newPassword: ['', [Validators.minLength(8)]], confirmPassword: [''] },
      { validators: passwordMatchValidator }
    ),
  });

  get changePasswordGroup(): FormGroup {
    return this.settingsForm.get('changePassword') as FormGroup;
  }

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
      phone: '',
      bio: '',
      changePassword: { newPassword: '', confirmPassword: '' },
    });
  }
}
