import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiStore } from 'src/configs/api';
import { HttpClient } from '@angular/common/http';
import { ResAPIProduct } from '../models/responseAPI';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = `${apiStore.api + 'products' + '?API_KEY=' + apiStore.api_key}`

  constructor( private http: HttpClient) { }

  getProducts(): Observable<ResAPIProduct> {
    return this.http.get<ResAPIProduct>(this.baseUrl);
  }
}
