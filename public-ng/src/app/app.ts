import { Component, signal } from '@angular/core';
import {
  Router,
  RouterOutlet,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

import { Spinner } from './components/partials/spinner/spinner';

import { AsyncPipe } from '@angular/common';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Spinner, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(public loader: LoaderService, private router: Router) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        loader.show();
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        loader.hide();
      }

    });

    const isLocalHost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '::1';

    if ('serviceWorker' in navigator && window.isSecureContext && !isLocalHost) {
      navigator.serviceWorker.register('/service-worker.js').catch((err) => {
        console.warn('Service worker registration skipped', err);
      });
    }

  }

  protected readonly title = signal('Dates Saugrenue');



  
}
