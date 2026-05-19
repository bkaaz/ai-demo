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
  const password = group.get('newPassword')?.value;
  const confirm = group.get('confirmPassword')?.value;
  if (!password && !confirm) return null;
  return password === confirm ? null : { passwordMismatch: true };
}

class PasswordMismatchStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form?.submitted ?? false;
    const isTouched = control?.touched ?? false;
    const groupHasError = control?.parent?.hasError('passwordMismatch') ?? false;
    return groupHasError && (isTouched || isSubmitted);
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
  passwordMismatchMatcher = new PasswordMismatchStateMatcher();

  settingsForm = this.fb.group({
    name: ['John Doe', [Validators.required, Validators.minLength(3)]],
    email: ['john@example.com', [Validators.required, Validators.email]],
    notifications: [true],
    theme: ['Light'],
    phone: ['', [Validators.pattern(/^(\+48)?\d{9}$/)]],
    bio: ['', [Validators.maxLength(200)]],
    passwordGroup: this.fb.group({
      newPassword: ['', [Validators.minLength(8)]],
      confirmPassword: [''],
    }, { validators: passwordMatchValidator }),
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
      phone: '',
      bio: '',
      passwordGroup: { newPassword: '', confirmPassword: '' },
    });
  }
}
