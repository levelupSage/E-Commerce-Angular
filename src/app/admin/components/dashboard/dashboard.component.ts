import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  products: any[] = [];
  
  constructor (private adminService: AdminService){}
  
  ngOnInit(){
    this.getAllProducts();
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
}
