import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, of, switchMap, catchError } from 'rxjs';
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

  public readonly authorized = computed(() => Boolean(this.tokenService.get()));
  public readonly tokenValue = computed(() => this.tokenService.get());
  public readonly profile = computed(() => this.profileData());

  public login(request: LoginRequest) {
    return this.http.post<LoginResponse>('/user/login', request).pipe(
      tap(response => {
        this.tokenService.set(response.token);
      }),
      switchMap(() => this.requestProfile())
    );
  }

  public requestProfile() {
    const token = this.tokenService.get();
    if (!token) return of(null);

    return this.http.get<ProfileResponse>('/user/profile').pipe(
      tap(profile => {
        this.profileData.set(profile);
      }),
      catchError(() => {
        this.tokenService.remove();
        return of(null);
      })
    );
  }

  public logout = () => {
    this.tokenService.remove();
    this.profileData.set(null);
  }
}
