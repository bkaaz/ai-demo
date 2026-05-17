import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('displayedColumns', () => {
    it('should display name, email, role, and status', () => {
      expect(component.displayedColumns).toEqual(['name', 'email', 'role', 'status']);
    });
  });

  describe('dataSource', () => {
    it('should have 15 users', () => {
      expect(component.dataSource.data.length).toBe(15);
    });

    it('should have users with required fields', () => {
      component.dataSource.data.forEach((user) => {
        expect(user.id).toBeDefined();
        expect(user.name).toBeTruthy();
        expect(user.email).toContain('@');
        expect(user.role).toBeTruthy();
        expect(user.status).toBeTruthy();
        expect(user.joinDate).toBeInstanceOf(Date);
      });
    });
  });

  describe('roles', () => {
    it('should include All and specific roles', () => {
      expect(component.roles).toContain('All');
      expect(component.roles).toContain('Admin');
      expect(component.roles).toContain('Editor');
      expect(component.roles).toContain('Viewer');
    });
  });

  describe('filtering', () => {
    it('should filter by search text', () => {
      component.onSearchChange('alice');
      const filtered = component.dataSource.filteredData;
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((user) => {
        const matchesName = user.name.toLowerCase().includes('alice');
        const matchesEmail = user.email.toLowerCase().includes('alice');
        expect(matchesName || matchesEmail).toBeTrue();
      });
    });

    it('should filter by role', () => {
      component.onRoleChange('Admin');
      const filtered = component.dataSource.filteredData;
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((user) => {
        expect(user.role).toBe('Admin');
      });
    });

    it('should combine search and role filters', () => {
      component.onSearchChange('a');
      component.onRoleChange('Admin');
      const filtered = component.dataSource.filteredData;
      filtered.forEach((user) => {
        expect(user.role).toBe('Admin');
        const matchesSearch =
          user.name.toLowerCase().includes('a') || user.email.toLowerCase().includes('a');
        expect(matchesSearch).toBeTrue();
      });
    });

    it('should show all users when search is empty and role is All', () => {
      component.onSearchChange('test');
      component.onRoleChange('Admin');
      component.onSearchChange('');
      component.onRoleChange('All');
      expect(component.dataSource.filteredData.length).toBe(15);
    });

    it('should be case-insensitive for search', () => {
      component.onSearchChange('ALICE');
      const filtered = component.dataSource.filteredData;
      expect(filtered.length).toBeGreaterThan(0);
    });
  });

  describe('signals', () => {
    it('should update searchValue signal on search change', () => {
      component.onSearchChange('test');
      expect(component.searchValue()).toBe('test');
    });

    it('should update selectedRole signal on role change', () => {
      component.onRoleChange('Editor');
      expect(component.selectedRole()).toBe('Editor');
    });
  });
});
