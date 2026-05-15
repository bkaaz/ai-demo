import { Component, signal, computed, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: Date;
}

const MOCK_USERS: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', joinDate: new Date(2024, 0, 15) },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', joinDate: new Date(2024, 1, 20) },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'Active', joinDate: new Date(2024, 2, 10) },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Inactive', joinDate: new Date(2024, 3, 5) },
  { id: 5, name: 'Eva Martinez', email: 'eva@example.com', role: 'Admin', status: 'Active', joinDate: new Date(2024, 4, 12) },
  { id: 6, name: 'Frank Garcia', email: 'frank@example.com', role: 'Viewer', status: 'Active', joinDate: new Date(2024, 5, 18) },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active', joinDate: new Date(2024, 6, 22) },
  { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'Viewer', status: 'Inactive', joinDate: new Date(2024, 7, 3) },
  { id: 9, name: 'Iris Taylor', email: 'iris@example.com', role: 'Admin', status: 'Active', joinDate: new Date(2024, 8, 14) },
  { id: 10, name: 'Jack Anderson', email: 'jack@example.com', role: 'Editor', status: 'Active', joinDate: new Date(2024, 9, 8) },
  { id: 11, name: 'Karen Thomas', email: 'karen@example.com', role: 'Viewer', status: 'Active', joinDate: new Date(2024, 10, 1) },
  { id: 12, name: 'Leo Jackson', email: 'leo@example.com', role: 'Editor', status: 'Inactive', joinDate: new Date(2024, 11, 19) },
  { id: 13, name: 'Mia White', email: 'mia@example.com', role: 'Viewer', status: 'Active', joinDate: new Date(2025, 0, 7) },
  { id: 14, name: 'Noah Harris', email: 'noah@example.com', role: 'Admin', status: 'Active', joinDate: new Date(2025, 1, 25) },
  { id: 15, name: 'Olivia Clark', email: 'olivia@example.com', role: 'Editor', status: 'Active', joinDate: new Date(2025, 2, 11) },
];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['name', 'email', 'role', 'status'];
  dataSource = new MatTableDataSource<User>(MOCK_USERS);
  roles = ['All', 'Admin', 'Editor', 'Viewer'];

  searchValue = signal('');
  selectedRole = signal('All');

  filteredCount = computed(() => this.dataSource.filteredData.length);

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const parsed = JSON.parse(filter);
      const matchesSearch =
        !parsed.search ||
        data.name.toLowerCase().includes(parsed.search) ||
        data.email.toLowerCase().includes(parsed.search);
      const matchesRole = parsed.role === 'All' || data.role === parsed.role;
      return matchesSearch && matchesRole;
    };
  }

  applyFilter(): void {
    this.dataSource.filter = JSON.stringify({
      search: this.searchValue().toLowerCase(),
      role: this.selectedRole(),
    });
  }

  onSearchChange(value: string): void {
    this.searchValue.set(value);
    this.applyFilter();
  }

  onRoleChange(value: string): void {
    this.selectedRole.set(value);
    this.applyFilter();
  }
}
