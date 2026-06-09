import { Component, output, inject, OnInit, signal } from '@angular/core';
import { ModalInstall } from '../modal-install/modal-install';
import { UserService } from '../../services/user.service';
import { User } from '../../models/entity/user';


@Component({
  selector: 'panel-footer',
  imports: [ModalInstall],
  templateUrl: './panel-footer.html',
  styleUrl: './panel-footer.css',
})
export class PanelFooter implements OnInit {

  userService = inject(UserService);
  onReload = output<void>();
  onShowModalFiltres = output<void>();
  isAppInstalled: boolean = false;

  ngOnInit() {
    this.checkIsAppInstalled();    
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
      /*this.$main.excel.exportExcel(this.$main.allEvents);*/
    }

    openModalFiltres() {
      this.onShowModalFiltres.emit();
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

    async installApp() {    /*          
      if (!this.deferredPrompt) {
        this.$refs["modal-install"].open();
      }
      else {
        this.deferredPrompt.prompt();
        const choice = await this.deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          console.log('Installée');
        } else {
          console.log('Refusée');
        }
        this.deferredPrompt = null;

      }
      return false;*/
    }

}
