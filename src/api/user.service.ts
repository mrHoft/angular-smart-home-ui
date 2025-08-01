import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { tap, switchMap } from 'rxjs';
import { TokenService } from './token.service';

interface LoginRequest {
  userName: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface ProfileResponse {
  fullName: string;
  initials: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  private profileData = signal<ProfileResponse | null>(null);

  public isLoggedIn = computed(() => !!this.tokenService.get());
  public tokenValue = computed(() => this.tokenService.get());
  public profile = computed(() => this.profileData());

  public login(request: LoginRequest) {
    return this.http.post<LoginResponse>('/user/login', request).pipe(
      tap(response => {
        this.tokenService.set(response.token);
      }),
      switchMap(() => this.requestProfile())
    ).subscribe();
  }

  public requestProfile() {
    const token = this.tokenService.get();
    if (!token) throw new Error('No token available');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<ProfileResponse>('/user/profile', { headers }).pipe(
      tap(profile => {
        this.profileData.set(profile);
      })
    );
  }

  public logout() {
    this.tokenService.remove();
    this.profileData.set(null);
  }
}
