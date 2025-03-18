import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../../service/storage/user-storage.service';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8081/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    //debugger
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
  getAllProducts(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/customer/products', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProductsByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addToCart(productId: any): Observable<any> {
    //debugger
    //console.log(UserStorageService.getUserId());
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + `api/customer/cart`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  increaseProductQuantity(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + `api/customer/addition`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  decreaseProductQuantity(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + `api/customer/deduction`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addCartByUserId(): Observable<any> {
    //debugger
    const userId = UserStorageService.getUserId() 
    return this.http.get(BASIC_URL + `api/customer/cart/${userId}` , {
      headers: this.createAuthorizationHeader(),
    });
  }

  applyCoupon(code:any): Observable<any> {
    //debugger
    const userId = UserStorageService.getUserId() 
    return this.http.get(BASIC_URL + `api/customer/coupon/${userId}/${code}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  placeOrder(orderDto:any): Observable<any> {
    //debugger
    orderDto.userId = UserStorageService.getUserId() 
    return this.http.post(BASIC_URL + `api/customer/placeOrder`, orderDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getOrdersByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId() 
    return this.http.get(BASIC_URL + `api/customer/myOrders/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
}
