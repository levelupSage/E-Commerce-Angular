import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    });
  }

  getAllProducts() {
    //debugger
    this.products = [];
    this.customerService.getAllProducts().subscribe(res => {
      res.forEach(element => {
        if (element.img) {
          element.processedImg = 'data:image/jpeg;base64,' + element.img;
        } else {
          console.warn(`Image data missing for product ID: ${element.id}`);
          element.processedImg = 'path/to/default/image.jpg';
        }
        this.products.push(element);
      });
    }, error => {
      console.error("Error fetching products:", error);
    });
  }

  submitForm() {
    //debugger
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.customerService.getAllProductsByName(title).subscribe(res => {
      res.forEach(element => {
        if (element.img) {
          element.processedImg = 'data:image/jpeg;base64,' + element.img;
        } else {
          console.warn(`Image data missing for product ID: ${element.id}`);
          element.processedImg = 'path/to/default/image.jpg';
        }
        this.products.push(element);
      });
    }, error => {
      console.error("Error fetching products:", error);
    });
  }

  addToCart(id: any) {
    this.customerService.addToCart(id).subscribe(res => {
      this.snackBar.open("Product added to cart successfully", "Close", {
        duration: 5000
      })
    })
  }
}
