import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../service/product.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AccountService } from '../service/account.service';
import { User } from '../models/user';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  user: User | null;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private location: Location,
    private router: Router,
    private accountService: AccountService
  ) {
    this.user = this.accountService.userValue;
  }

  public get totalProducts(): number {
    return this.products.length;
  }

  // Create a method to retrieve the heroes from the service.
  ngOnInit(): void {
    this.userService.getUserProduct().subscribe({
      next: () => {
        this.retrieveProducts();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Fetch all products to the the /products route
  retrieveProducts(): void {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
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
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
