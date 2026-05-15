import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  trend: string;
  color: string;
}

interface ActivityEvent {
  message: string;
  timestamp: Date;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatListModule, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  stats = signal<StatCard[]>([
    { title: 'Total Users', value: '2,847', icon: 'people', trend: '+12%', color: '#1976d2' },
    { title: 'Revenue', value: '$48,295', icon: 'attach_money', trend: '+8%', color: '#388e3c' },
    { title: 'Orders', value: '1,423', icon: 'shopping_cart', trend: '+23%', color: '#f57c00' },
    { title: 'Growth', value: '18.2%', icon: 'trending_up', trend: '+4%', color: '#7b1fa2' },
  ]);

  chartData = signal([65, 42, 78, 55, 90, 68, 82, 45, 72, 88, 60, 75]);
  chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  events = signal<ActivityEvent[]>([
    { message: 'New user registered: john.doe@email.com', timestamp: new Date(2026, 4, 15, 10, 30), icon: 'person_add' },
    { message: 'Order #1423 completed successfully', timestamp: new Date(2026, 4, 15, 9, 15), icon: 'check_circle' },
    { message: 'System backup completed', timestamp: new Date(2026, 4, 15, 8, 0), icon: 'backup' },
    { message: 'New feature deployed to production', timestamp: new Date(2026, 4, 14, 17, 45), icon: 'rocket_launch' },
    { message: 'Monthly report generated', timestamp: new Date(2026, 4, 14, 14, 30), icon: 'description' },
  ]);

  getBarHeight(value: number): number {
    return (value / 100) * 100;
  }
}
