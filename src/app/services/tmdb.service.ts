import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = '620d9a8d34a13188a0f04adc51d16ebd';  
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  /**
   * Search for an actor by name
   */
  searchActor(name: string): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('query', name);

    return this.http.get(`${this.baseUrl}/search/person`, { params });
  }

  /**
   * Get all credits (movies & shows) for a person by ID
   */
  getActorCredits(personId: number): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get(`${this.baseUrl}/person/${personId}/combined_credits`, { params });
  }

  getPopularActors(): Observable<any> {
    const randomPage = Math.floor(Math.random() * 100) + 1;
  
    return this.http.get(`${this.baseUrl}/person/popular`, {
      params: {
        api_key: this.apiKey,
        page: randomPage
      }
    });
  }
  
  
}
