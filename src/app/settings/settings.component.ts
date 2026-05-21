import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroupDirective, NgForm, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const newPassword = group.get('newPassword')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return newPassword === confirmPassword ? null : { passwordMismatch: true };
}

class PasswordMismatchMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control?.parent?.hasError('passwordMismatch') && control?.touched);
  }
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
  passwordMatcher = new PasswordMismatchMatcher();

  settingsForm = this.fb.group({
    name: ['John Doe', [Validators.required, Validators.minLength(3)]],
    email: ['john@example.com', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^(\+48)?\d{7,}$/)]],
    bio: ['', [Validators.maxLength(200)]],
    notifications: [true],
    theme: ['Light'],
    password: this.fb.group({
      newPassword: ['', [Validators.minLength(8)]],
      confirmPassword: [''],
    }, { validators: [passwordMatchValidator] }),
  });

  get bioLength(): number {
    return this.settingsForm.get('bio')?.value?.length ?? 0;
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
      phone: '',
      bio: '',
      notifications: true,
      theme: 'Light',
      password: { newPassword: '', confirmPassword: '' },
    });
  }
}
