# Component Template Reference

## TypeScript (.component.ts)

```typescript
import { Component, signal, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'app-FEATURE',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './FEATURE.component.html',
  styleUrl: './FEATURE.component.scss',
})
export class FeatureComponent {
  items = signal<Item[]>([]);
  filteredItems = computed(() => this.items().filter(/* ... */));
}
```

## HTML (.component.html)

```html
<div class="feature" data-testid="feature-page">
  <h1 data-testid="page-title">Feature Title</h1>

  @if (items().length > 0) {
    <div class="grid" data-testid="items-grid">
      @for (item of items(); track item.id) {
        <mat-card [attr.data-testid]="'item-' + item.id">
          <mat-card-content>
            {{ item.name }}
          </mat-card-content>
        </mat-card>
      }
    </div>
  } @else {
    <div data-testid="empty-state">No items found</div>
  }
</div>
```

## SCSS (.component.scss)

```scss
.feature {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

## Route (app.routes.ts)

```typescript
{
  path: 'feature',
  loadComponent: () =>
    import('./feature/feature.component').then((m) => m.FeatureComponent),
},
```

## Nav Item (layout.component.ts)

```typescript
{ icon: 'icon_name', label: 'Feature', route: '/feature' }
```
