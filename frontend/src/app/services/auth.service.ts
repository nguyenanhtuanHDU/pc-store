import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService,) { }

  getAccessToken() {
    return this.cookieService.get('accessToken')
  }

  setAccessToken(token: string) {
    return this.cookieService.set('accessToken', token)
  }

  removeAccessToken() {
    this.cookieService.set('accessToken', "")
  }
}
