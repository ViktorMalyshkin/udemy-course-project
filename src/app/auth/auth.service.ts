import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string
  localId: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyD8a-F7_cXQOFagf3Hd1Wj2mr6bvZREzqk',
      {email: email, password: password, returnSecureToken: true})
  }
}