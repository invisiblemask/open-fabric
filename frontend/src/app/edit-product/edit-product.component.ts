import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent {
  @Output() updatedProduct: EventEmitter<void> = new EventEmitter<void>();

  @Input() currentProduct: Product = {
    name: '',
    image: '',
    brand: '',
    price: '',
  };

  id: any;

  product: Product = {
    name: '',
    image: '',
    brand: '',
    price: '',
  };

  productForm!: FormGroup;

  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private location: Location
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
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

  updateProduct(): void {
    const updatedProduct = this.productForm.value;

    this.message = '';

    this.productService.updateProductById(this.id, updatedProduct).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This Product was updated sucessfully';
        this.updatedProduct.emit();
      },
      error: (e) => console.log(e),
    });
  }

  closeModal(): void {
    const modalDiv = document.getElementById('exampleModal');
    if (modalDiv !== null) {
      modalDiv.style.display = 'none';
    }
    this.location.go(this.location.path());
  }
}
