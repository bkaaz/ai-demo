import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('stats signal', () => {
    it('should have 4 stat cards', () => {
      expect(component.stats().length).toBe(4);
    });

    it('should have correct stat titles', () => {
      const titles = component.stats().map((s) => s.title);
      expect(titles).toEqual(['Total Users', 'Revenue', 'Orders', 'Growth']);
    });

    it('should have icons for each stat', () => {
      component.stats().forEach((stat) => {
        expect(stat.icon).toBeTruthy();
      });
    });

    it('should have trend percentages for each stat', () => {
      component.stats().forEach((stat) => {
        expect(stat.trend).toMatch(/^\+\d+%$/);
      });
    });
  });

  describe('chartData signal', () => {
    it('should have 12 data points', () => {
      expect(component.chartData().length).toBe(12);
    });

    it('should have values between 0 and 100', () => {
      component.chartData().forEach((value) => {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
      });
    });
  });

  describe('chartLabels', () => {
    it('should have 12 month labels', () => {
      expect(component.chartLabels.length).toBe(12);
    });

    it('should start with Jan and end with Dec', () => {
      expect(component.chartLabels[0]).toBe('Jan');
      expect(component.chartLabels[11]).toBe('Dec');
    });
  });

  describe('events signal', () => {
    it('should have 5 activity events', () => {
      expect(component.events().length).toBe(5);
    });

    it('should have message, timestamp, and icon for each event', () => {
      component.events().forEach((event) => {
        expect(event.message).toBeTruthy();
        expect(event.timestamp).toBeInstanceOf(Date);
        expect(event.icon).toBeTruthy();
      });
    });
  });

  describe('getBarHeight', () => {
    it('should return percentage for given value', () => {
      expect(component.getBarHeight(50)).toBe(50);
    });

    it('should return 100 for max value', () => {
      expect(component.getBarHeight(100)).toBe(100);
    });

    it('should return 0 for zero value', () => {
      expect(component.getBarHeight(0)).toBe(0);
    });
  });
});
