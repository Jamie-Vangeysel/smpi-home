import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  post(location: any, username: string): Observable<void> {
    return this.http.post<void>(`${environment.api_url}location`, {
      user: username,
      location
    });
  }
}
