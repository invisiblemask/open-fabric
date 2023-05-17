import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from '../product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  // @Input() viewMode = false;

  @Input() product?: Product = {
    name: '',
    image: '',
    price: '',
  };

  // message = '';

  // product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProductDetail();
  }

  getProductDetail(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(productId).subscribe((product) => {
      this.product = product;
    });
  }

  goBack(): void {
    this.location.back();
  }

  openModal() {
    const modalDiv = document.getElementById('exampleModal');
    if (modalDiv !== null) {
      modalDiv.style.display = 'block';
    }
    // Change the URL path to /products/add
  }

  closeModal() {
    const modalDiv = document.getElementById('exampleModal');
    if (modalDiv !== null) {
      modalDiv.style.display = 'none';
    }
  }
}
