import { GenericResponse } from '../models/GenericResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerticularService {

  private baseUrl: string = "http://localhost:9000/budget/"
  constructor(private http: HttpClient) { }

  addPerticular(type: String,perticular:string) {
    return this.http.post<GenericResponse>(`${this.baseUrl}`+type+'/'+perticular,null);
  }
}
