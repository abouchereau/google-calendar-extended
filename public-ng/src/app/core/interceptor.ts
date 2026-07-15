import { HttpInterceptorFn } from '@angular/common/http';
import { browserStorage } from './browser-storage';

export const authInterceptor: HttpInterceptorFn =
  (req, next) => {

    const token = browserStorage.getItem('token');

    if (!token) {
      return next(req);
    }

    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned);
  };
