import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-api-integration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './api-integration.component.html',
  styleUrls: ['./api-integration.component.scss'],
})
export class ApiIntegrationComponent {
  products$!: Observable<any[]>;
  filteredProducts$!: Observable<any[]>;
  searchValue: string = '';
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private dataService: ApiServicesService) {}

  ngOnInit(): void {
    this.products$ = this.dataService.getData();

    this.filteredProducts$ = combineLatest([this.products$, this.searchSubject.pipe(debounceTime(300))]).pipe(
      map(([products, searchValue]) => 
        products.reduce((acc, product) => {
          if (product.title.toLowerCase().includes(searchValue.toLowerCase())) {
            acc.push(product);
          }
          return acc;
        }, [])
      )
    );
  }

  filterProducts(): void {
    this.searchSubject.next(this.searchValue);
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
