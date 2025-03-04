import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  orders: any;

  constructor(
    private adminservice: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPlaceOrders();
  }
  getPlaceOrders() {
    this.adminservice.getPlaceOrders().subscribe(res => {
      this.orders = res;
    })
  }
}
