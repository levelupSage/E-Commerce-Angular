import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../service/storage/user-storage.service';

const BASIC_URL = "http://localhost:8081/"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  addCategory(categoryDto: any): Observable<any>{
    return this.http.post(BASIC_URL + 'api/admin/category', categoryDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCategory(): Observable<any>{
    return this.http.get(BASIC_URL + 'api/admin/categories', {
      headers: this.createAuthorizationHeader(),
    });
  }

  addProduct(ProductDto: any): Observable<any>{
    return this.http.post(BASIC_URL + 'api/admin/product', ProductDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }

  getAllProducts(): Observable<any>{
    return this.http.get(BASIC_URL + 'api/admin/products', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProductsByName(name:any): Observable<any>{
    return this.http.get(BASIC_URL + `api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addCoupon(couponDto: any): Observable<any>{
    debugger
    return this.http.post(BASIC_URL + 'api/admin/coupons', couponDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCoupons(): Observable<any>{
    return this.http.get(BASIC_URL + 'api/admin/coupons', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getPlaceOrders(): Observable<any>{
    return this.http.get(BASIC_URL + 'api/admin/placeOrders', {
      headers: this.createAuthorizationHeader(),
    });
  }

  changeOrderStatus(orderId: number, status: string): Observable<any>{
    return this.http.get(BASIC_URL + `api/admin/order/${orderId}/${status}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  postFAQ(productId: number, faqDto: any): Observable<any>{
    return this.http.post(BASIC_URL + `api/admin/faq/${productId}`, faqDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  productDeleteById(productId:any): Observable<any>{
    return this.http.delete(BASIC_URL + `api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

}
