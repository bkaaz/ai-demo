import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let breakpointSubject: Subject<BreakpointState>;

  beforeEach(async () => {
    breakpointSubject = new Subject<BreakpointState>();

    const breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);
    breakpointObserverSpy.observe.and.returnValue(breakpointSubject.asObservable());

    await TestBed.configureTestingModule({
      imports: [LayoutComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: BreakpointObserver, useValue: breakpointObserverSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navItems', () => {
    it('should have 3 navigation items', () => {
      expect(component.navItems.length).toBe(3);
    });

    it('should have correct paths', () => {
      const paths = component.navItems.map((item) => item.path);
      expect(paths).toEqual(['/dashboard', '/users', '/settings']);
    });

    it('should have labels and icons for each item', () => {
      component.navItems.forEach((item) => {
        expect(item.label).toBeTruthy();
        expect(item.icon).toBeTruthy();
      });
    });
  });

  describe('responsive behavior', () => {
    it('should set isMobile to true on handset breakpoint', () => {
      breakpointSubject.next({ matches: true, breakpoints: {} });
      expect(component.isMobile()).toBeTrue();
    });

    it('should close sidenav on mobile', () => {
      breakpointSubject.next({ matches: true, breakpoints: {} });
      expect(component.sidenavOpened()).toBeFalse();
    });

    it('should set isMobile to false on desktop', () => {
      breakpointSubject.next({ matches: false, breakpoints: {} });
      expect(component.isMobile()).toBeFalse();
    });

    it('should open sidenav on desktop', () => {
      breakpointSubject.next({ matches: false, breakpoints: {} });
      expect(component.sidenavOpened()).toBeTrue();
    });
  });

  describe('toggleSidenav', () => {
    it('should toggle sidenavOpened on desktop', () => {
      breakpointSubject.next({ matches: false, breakpoints: {} });
      expect(component.sidenavOpened()).toBeTrue();

      component.toggleSidenav();
      expect(component.sidenavOpened()).toBeFalse();

      component.toggleSidenav();
      expect(component.sidenavOpened()).toBeTrue();
    });
  });
});
