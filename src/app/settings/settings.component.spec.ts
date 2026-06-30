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
  });

  describe('form defaults', () => {
    it('should have empty phone by default', () => {
      expect(component.settingsForm.get('phone')?.value).toBe('');
    });

    it('should have empty bio by default', () => {
      expect(component.settingsForm.get('bio')?.value).toBe('');
    });

    it('should have empty newPassword by default', () => {
      expect(component.changePasswordGroup.get('newPassword')?.value).toBe('');
    });

    it('should have empty confirmPassword by default', () => {
      expect(component.changePasswordGroup.get('confirmPassword')?.value).toBe('');
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
    it('should be valid when empty', () => {
      component.settingsForm.get('phone')?.setValue('');
      expect(component.settingsForm.get('phone')?.valid).toBeTrue();
    });

    it('should be valid with digits only', () => {
      component.settingsForm.get('phone')?.setValue('123456789');
      expect(component.settingsForm.get('phone')?.valid).toBeTrue();
    });

    it('should be valid with +48 prefix', () => {
      component.settingsForm.get('phone')?.setValue('+48123456789');
      expect(component.settingsForm.get('phone')?.valid).toBeTrue();
    });

    it('should be invalid with letters', () => {
      component.settingsForm.get('phone')?.setValue('abc');
      expect(component.settingsForm.get('phone')?.hasError('pattern')).toBeTrue();
    });

    it('should be invalid with wrong country prefix', () => {
      component.settingsForm.get('phone')?.setValue('+49123456789');
      expect(component.settingsForm.get('phone')?.hasError('pattern')).toBeTrue();
    });
  });

  describe('bio validation', () => {
    it('should be valid when empty', () => {
      component.settingsForm.get('bio')?.setValue('');
      expect(component.settingsForm.get('bio')?.valid).toBeTrue();
    });

    it('should be valid with 200 characters', () => {
      component.settingsForm.get('bio')?.setValue('a'.repeat(200));
      expect(component.settingsForm.get('bio')?.valid).toBeTrue();
    });

    it('should be invalid with more than 200 characters', () => {
      component.settingsForm.get('bio')?.setValue('a'.repeat(201));
      expect(component.settingsForm.get('bio')?.hasError('maxlength')).toBeTrue();
    });
  });

  describe('password validation', () => {
    it('should be valid when newPassword is empty', () => {
      component.changePasswordGroup.get('newPassword')?.setValue('');
      expect(component.changePasswordGroup.get('newPassword')?.valid).toBeTrue();
    });

    it('should be invalid when newPassword is less than 8 characters', () => {
      component.changePasswordGroup.get('newPassword')?.setValue('short');
      expect(component.changePasswordGroup.get('newPassword')?.hasError('minlength')).toBeTrue();
    });

    it('should be valid when newPassword is at least 8 characters', () => {
      component.changePasswordGroup.get('newPassword')?.setValue('longenough');
      expect(component.changePasswordGroup.get('newPassword')?.valid).toBeTrue();
    });

    it('should have passwordMismatch error when passwords differ', () => {
      component.changePasswordGroup.get('newPassword')?.setValue('password1');
      component.changePasswordGroup.get('confirmPassword')?.setValue('password2');
      expect(component.changePasswordGroup.hasError('passwordMismatch')).toBeTrue();
    });

    it('should not have passwordMismatch error when passwords match', () => {
      component.changePasswordGroup.get('newPassword')?.setValue('samepass');
      component.changePasswordGroup.get('confirmPassword')?.setValue('samepass');
      expect(component.changePasswordGroup.hasError('passwordMismatch')).toBeFalse();
    });

    it('should not have passwordMismatch error when both passwords are empty', () => {
      component.changePasswordGroup.get('newPassword')?.setValue('');
      component.changePasswordGroup.get('confirmPassword')?.setValue('');
      expect(component.changePasswordGroup.hasError('passwordMismatch')).toBeFalse();
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
      component.settingsForm.get('notifications')?.setValue(false);
      component.settingsForm.get('theme')?.setValue('Dark');
      component.settingsForm.get('phone')?.setValue('+48999999999');
      component.settingsForm.get('bio')?.setValue('Some bio text');
      component.changePasswordGroup.get('newPassword')?.setValue('newpass123');
      component.changePasswordGroup.get('confirmPassword')?.setValue('newpass123');

      component.onReset();

      expect(component.settingsForm.get('name')?.value).toBe('John Doe');
      expect(component.settingsForm.get('email')?.value).toBe('john@example.com');
      expect(component.settingsForm.get('notifications')?.value).toBeTrue();
      expect(component.settingsForm.get('theme')?.value).toBe('Light');
      expect(component.settingsForm.get('phone')?.value).toBe('');
      expect(component.settingsForm.get('bio')?.value).toBe('');
      expect(component.changePasswordGroup.get('newPassword')?.value).toBe('');
      expect(component.changePasswordGroup.get('confirmPassword')?.value).toBe('');
    });
  });
});
