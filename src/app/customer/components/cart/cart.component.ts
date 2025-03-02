import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../service/customer.service';
import { error } from 'node:console';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartItems: any[] = [];
  order: any;

  couponForm!: FormGroup;

  constructor(private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      code: [null, [Validators.required]]
    })
    this.getCart();
  }

  getCart() {
    this.cartItems = [];
    this.customerService.addCartByUserId().subscribe(res => {
      console.log("API Response:", res);
      console.log("Cart Items:", res?.cartItemsDto);

      this.order = res;
      res?.cartItemsDto?.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cartItems.push(element);
      });
    }, error => {
      console.error("Error fetching cart items:", error);
    });
  }

  applyCoupon() {
    debugger
    this.customerService.applyCoupon(this.couponForm.get(['code'])!.value).subscribe(res => {
      this.snackBar.open("Coupon Applied Successfully", 'Close', {
        duration: 5000
      });
      this.getCart();
    }, error => {
      this.snackBar.open(error.error, 'close', {
        duration: 5000
      });
    })
  }

  increaseQuantity(productId: any) {
    debugger
    this.customerService.increaseProductQuantity(productId).subscribe(res => {
      this.snackBar.open("Product Quantity Increased.", 'Close', {
        duration: 5000
      });
      this.getCart();
    })
  }

  decreaseQuantity(productId: any) {
    debugger
    this.customerService.decreaseProductQuantity(productId).subscribe(res => {
      this.snackBar.open("Product Quantity Decreased.", 'Close', {
        duration: 5000
      });
      this.getCart();
    })
  }  

}
