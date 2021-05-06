import { HttpHandler, HttpInterceptor, HttpEvent, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { AuthService } from 'src/app/service/auth.service';
import { Observable, throwError } from 'rxjs';
import { JwtDto } from 'src/app/models/jwt-dto';
import { concatMap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProdInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.tokenService.isLogged()) {
      return next.handle(req);
    }

    let intReq = req;
    const token = this.tokenService.getToken();

    intReq = this.addToken(req, token);

    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const dto: JwtDto = new JwtDto(this.tokenService.getToken());
        return this.authService.refresh(dto).pipe(concatMap((data: any) => {
          console.log('refreshing....');
          this.tokenService.setToken(data.token);
          intReq = this.addToken(req, data.token);
          return next.handle(intReq);
        }));
      } else {
        this.tokenService.logOut();
        return throwError(err);
      }
    }));
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  }
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true }];

