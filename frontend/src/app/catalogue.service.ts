import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pizza } from 'shared/models/Pizza';

@Injectable({
  providedIn: 'root'
})

export class CatalogueService {
  baseUrl = "https://tp05-jonathan.herokuapp.com/api/";

  constructor(private httpClient: HttpClient) { }

  public getCatalogue(): Observable<Pizza[]> {
    return this.httpClient.get<any>(this.baseUrl + 'catalogue');
  }

  public getProduit(id: number): Observable<Pizza> {
    return this.httpClient.get<Pizza>(this.baseUrl + 'catalogue/' + id);
  }
}
