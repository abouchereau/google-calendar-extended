import { Component, output, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { BeforeInstallPromptEvent } from '../../../../types/BeforeInstallPromptEvent';
import { LoaderService } from '../../../services/loader.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'panel-footer',
  standalone: true,
  imports: [RouterLink ],
  templateUrl: './panel-footer.html',
  styleUrl: './panel-footer.css',
})
export class PanelFooter implements OnInit {

  userService = inject(UserService);
  loaderService = inject(LoaderService);
  onReload = output<void>();
  onExportExcel = output<void>();
  onShowModalFiltres = output<void>();
  onShowModalPwa = output<void>();
  isAppInstalled: boolean = false;
  deferredPrompt:BeforeInstallPromptEvent | null = null;


  ngOnInit() {
    this.checkIsAppInstalled();    
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault(); 
      this.deferredPrompt = e as BeforeInstallPromptEvent;
    });
  }

  refreshDates() {
    this.onReload.emit();
    return false;
  }

  logout() {
    this.userService.unregister();
    window.location.reload();
  }

  exportExcel() {
    this.onExportExcel.emit();
  }

  openModalFiltres() {
    this.onShowModalFiltres.emit();
    return false;
  }

  openModalPwa() {
    this.onShowModalPwa.emit();
    return false;
  }

  checkIsAppInstalled() {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true || window.Capacitor?.isNativePlatform()) {
      this.isAppInstalled = true;
    }
    else {
      this.isAppInstalled = false;
    }
  }



  async installApp() { 
    this.loaderService.show();
    if (this.deferredPrompt) {  
        try {

            const timeout = setTimeout(() => {
                if (this.deferredPrompt) {
                  this.loaderService.hide();
                  this.openModalPwa();
                }
            }, 5000);

            this.deferredPrompt.prompt(); 
            this.deferredPrompt.userChoice.then((choice) => {
                this.deferredPrompt = null;
                clearTimeout(timeout);
                  this.loaderService.hide();
            });
        } catch(e) {
            this.loaderService.hide();
            this.openModalPwa();
        }
        return ;
    }
      this.loaderService.hide();
      this.openModalPwa();

};



}

