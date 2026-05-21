import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form defaults', () => {
    it('should have default name', () => {
      expect(component.settingsForm.get('name')?.value).toBe('John Doe');
    });

    it('should have default email', () => {
      expect(component.settingsForm.get('email')?.value).toBe('john@example.com');
    });

    it('should have notifications enabled', () => {
      expect(component.settingsForm.get('notifications')?.value).toBeTrue();
    });

    it('should have Light theme selected', () => {
      expect(component.settingsForm.get('theme')?.value).toBe('Light');
    });

    it('should have empty phone', () => {
      expect(component.settingsForm.get('phone')?.value).toBe('');
    });

    it('should have empty bio', () => {
      expect(component.settingsForm.get('bio')?.value).toBe('');
    });

    it('should have empty password fields', () => {
      expect(component.settingsForm.get('password.newPassword')?.value).toBe('');
      expect(component.settingsForm.get('password.confirmPassword')?.value).toBe('');
    });
  });

  describe('themes', () => {
    it('should have Light, Dark, and System options', () => {
      expect(component.themes).toEqual(['Light', 'Dark', 'System']);
    });
  });

  describe('name validation', () => {
    it('should be invalid when empty', () => {
      component.settingsForm.get('name')?.setValue('');
      expect(component.settingsForm.get('name')?.hasError('required')).toBeTrue();
    });

    it('should be invalid when less than 3 characters', () => {
      component.settingsForm.get('name')?.setValue('Ab');
      expect(component.settingsForm.get('name')?.hasError('minlength')).toBeTrue();
    });

    it('should be valid with 3 or more characters', () => {
      component.settingsForm.get('name')?.setValue('Abc');
      expect(component.settingsForm.get('name')?.valid).toBeTrue();
    });
  });

  describe('email validation', () => {
    it('should be invalid when empty', () => {
      component.settingsForm.get('email')?.setValue('');
      expect(component.settingsForm.get('email')?.hasError('required')).toBeTrue();
    });

    it('should be invalid with bad format', () => {
      component.settingsForm.get('email')?.setValue('not-an-email');
      expect(component.settingsForm.get('email')?.hasError('email')).toBeTrue();
    });

    it('should be valid with correct format', () => {
      component.settingsForm.get('email')?.setValue('test@example.com');
      expect(component.settingsForm.get('email')?.valid).toBeTrue();
    });
  });

  describe('phone validation', () => {
    it('should be invalid with letters', () => {
      component.settingsForm.get('phone')?.setValue('abc');
      expect(component.settingsForm.get('phone')?.hasError('pattern')).toBeTrue();
    });

    it('should be valid with digits only', () => {
      component.settingsForm.get('phone')?.setValue('123456789');
      expect(component.settingsForm.get('phone')?.valid).toBeTrue();
    });

    it('should be valid with +48 prefix', () => {
      component.settingsForm.get('phone')?.setValue('+48123456789');
      expect(component.settingsForm.get('phone')?.valid).toBeTrue();
    });

    it('should be valid when empty', () => {
      component.settingsForm.get('phone')?.setValue('');
      expect(component.settingsForm.get('phone')?.valid).toBeTrue();
    });
  });

  describe('bio validation', () => {
    it('should be valid at 200 characters', () => {
      component.settingsForm.get('bio')?.setValue('a'.repeat(200));
      expect(component.settingsForm.get('bio')?.valid).toBeTrue();
    });

    it('should be invalid at 201 characters', () => {
      component.settingsForm.get('bio')?.setValue('a'.repeat(201));
      expect(component.settingsForm.get('bio')?.hasError('maxlength')).toBeTrue();
    });
  });

  describe('bioLength', () => {
    it('should return 0 for empty bio', () => {
      expect(component.bioLength).toBe(0);
    });

    it('should return correct length', () => {
      component.settingsForm.get('bio')?.setValue('Hello');
      expect(component.bioLength).toBe(5);
    });
  });

  describe('password validation', () => {
    it('should be invalid when new password is less than 8 characters', () => {
      component.settingsForm.get('password.newPassword')?.setValue('short');
      expect(component.settingsForm.get('password.newPassword')?.hasError('minlength')).toBeTrue();
    });

    it('should be valid when new password is 8 or more characters', () => {
      component.settingsForm.get('password.newPassword')?.setValue('longpassword');
      expect(component.settingsForm.get('password.newPassword')?.valid).toBeTrue();
    });

    it('should have mismatch error when passwords differ', () => {
      component.settingsForm.get('password.newPassword')?.setValue('password1');
      component.settingsForm.get('password.confirmPassword')?.setValue('password2');
      expect(component.settingsForm.get('password')?.hasError('passwordMismatch')).toBeTrue();
    });

    it('should not have mismatch error when passwords match', () => {
      component.settingsForm.get('password.newPassword')?.setValue('password1');
      component.settingsForm.get('password.confirmPassword')?.setValue('password1');
      expect(component.settingsForm.get('password')?.hasError('passwordMismatch')).toBeFalse();
    });
  });

  describe('onSubmit', () => {
    it('should open snackbar when form is valid', () => {
      const snackBarSpy = spyOn(component['snackBar'], 'open');
      component.onSubmit();
      expect(snackBarSpy).toHaveBeenCalledWith(
        'Settings saved successfully!',
        'Close',
        jasmine.objectContaining({ duration: 3000 })
      );
    });

    it('should mark all as touched when form is invalid', () => {
      component.settingsForm.get('name')?.setValue('');
      spyOn(component.settingsForm, 'markAllAsTouched');
      component.onSubmit();
      expect(component.settingsForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('should not open snackbar when form is invalid', () => {
      const snackBarSpy = spyOn(component['snackBar'], 'open');
      component.settingsForm.get('name')?.setValue('');
      component.onSubmit();
      expect(snackBarSpy).not.toHaveBeenCalled();
    });
  });

  describe('onReset', () => {
    it('should restore default values', () => {
      component.settingsForm.get('name')?.setValue('Changed');
      component.settingsForm.get('email')?.setValue('changed@example.com');
      component.settingsForm.get('phone')?.setValue('+48123456789');
      component.settingsForm.get('bio')?.setValue('Some bio text');
      component.settingsForm.get('notifications')?.setValue(false);
      component.settingsForm.get('theme')?.setValue('Dark');
      component.settingsForm.get('password.newPassword')?.setValue('password1');
      component.settingsForm.get('password.confirmPassword')?.setValue('password1');

      component.onReset();

      expect(component.settingsForm.get('name')?.value).toBe('John Doe');
      expect(component.settingsForm.get('email')?.value).toBe('john@example.com');
      expect(component.settingsForm.get('phone')?.value).toBe('');
      expect(component.settingsForm.get('bio')?.value).toBe('');
      expect(component.settingsForm.get('notifications')?.value).toBeTrue();
      expect(component.settingsForm.get('theme')?.value).toBe('Light');
      expect(component.settingsForm.get('password.newPassword')?.value).toBe('');
      expect(component.settingsForm.get('password.confirmPassword')?.value).toBe('');
    });
  });
});
