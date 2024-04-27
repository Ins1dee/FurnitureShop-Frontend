import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatisticResponse } from '../../shared/models/statisticResponse';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  statisticUrl = "statistic"

  constructor(private http : HttpClient) { }

  public getStatByYear(year : number) : Observable<StatisticResponse[]> {
    return this.http.get<StatisticResponse[]>(`${environment.apiUrl}/${this.statisticUrl}?year=${year}`);
  }
}
