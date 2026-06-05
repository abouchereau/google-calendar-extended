import { Component, signal } from '@angular/core';
import {
  Router,
  RouterOutlet,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

import { Spinner } from './components/spinner/spinner';

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

  }

  protected readonly title = signal('Dates Saugrenue');



  
}
