import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  products$!: Observable<any>;

  constructor(private route: ActivatedRoute,private dataService: ApiServicesService) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id')!;
    this.products$ = this.dataService.getData().pipe(
      map((products: any[]) => products.find(product => product.id === +productId))
    );
  }
}
