import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(private adminService: AdminService,
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
    this.adminService.getAllProducts().subscribe(res => {
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
    this.adminService.getAllProductsByName(title).subscribe(res => {
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

  productDeleteById(productId: any) {
    this.adminService.productDeleteById(productId).subscribe(res => {
      console.log("API Response:", res);
      if (res?.body == null) {
        this.snackBar.open('Product Deleted Successfully', 'close', {
          duration: 5000
        });
        this.getAllProducts();
      } else {
        this.snackBar.open(res.message, 'close', {
          duration: 500,
          panelClass: 'error-snackbar'
        });
      }
    })
  }

}
