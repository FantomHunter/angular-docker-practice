import { GreetingResponse } from './../../core/models/greetting-response.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userList: number[] = [1, 2, 3, 4, 5, 6];
  selectedUser = 1;
  backendMessage$: Observable<string> = of('');

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  loadData() {
    this.backendMessage$ = this.httpClient
      .get<GreetingResponse>(
        environment.backendUrl + '/greeting-from-db?id=' + this.selectedUser
      )
      .pipe(
        map((res: GreetingResponse) => {
          return res.message;
        }),
        catchError(async (ery) => 'Not found')
      );
  }

  onUserBoxChanged(user: number) {
    this.selectedUser = user;
  }
}
