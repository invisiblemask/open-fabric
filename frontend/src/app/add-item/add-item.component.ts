import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { Product } from '../product';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  @Output() addedProduct: EventEmitter<void> = new EventEmitter<void>();
  @Input() viewMode = false;

  @Input() currentProduct: Product = {
    name: '',
    image: '',
    price: '',
  };

  product: Product = {
    name: '',
    image: '',
    price: '',
  };

  submitted = false;

  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private location: Location,
    private router: Router
  ) {}

  openModal() {
    // Open the modal here
    const modalDiv = document.getElementById('exampleModal');
    if (modalDiv !== null) {
      modalDiv.style.display = 'none';
    }
    // Change the URL path to /products/add
    this.location.replaceState('/products/add');
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  get image() {
    return this.productForm.get('image')!;
  }

  get name() {
    return this.productForm.get('name')!;
  }

  get brand() {
    return this.productForm.get('brand')!;
  }

  get price() {
    return this.productForm.get('price')!;
  }

  closeModal() {
    const modalDiv = document.getElementById('exampleModal');
    if (modalDiv !== null) {
      modalDiv.style.display = 'none';
    }
    this.location.replaceState('/products');
    this.router.navigate(['/products']);
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      image: '',
      brand: '',
      price: '',
    };
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }
    const productData = this.productForm.value;
    this.productService.createProduct(productData).subscribe({
      next: (res) => {
        console.log(res);
        this.productForm.reset();
        this.submitted = true;
        // this.reloadPage();
      },
      error: (e) => console.error(e),
    });

    console.log(JSON.stringify(this.productForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.productForm.reset();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
