import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiStore } from 'src/configs/api';
import { ResponseAPICat } from '../models/responseAPI';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = `${apiStore.api + 'category' + '?API_KEY=' + apiStore.api_key}`

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ResponseAPICat> {
    return this.http.get<ResponseAPICat>(this.baseUrl);
  }
}
