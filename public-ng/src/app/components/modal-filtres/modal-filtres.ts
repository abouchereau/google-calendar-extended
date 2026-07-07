import { Component, inject, AfterViewInit, ViewChild, ElementRef, resource, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { Config } from '../../core/config';
import { Modal } from 'bootstrap';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { CalService } from '../../services/cal.service';

@Component({
  selector: 'modal-filtres',
  imports: [FormsModule],
  templateUrl: './modal-filtres.html',
  styleUrl: './modal-filtres.css',
})
export class ModalFiltres implements AfterViewInit {

  filter = inject(FilterService).filter;
  calService = inject(CalService);
  
  Config = Config;
  annees:number[] = Array.from({ length: (Config.LAST_YEAR - Config.FIRST_YEAR + 1) }, (_, i) => i + 1);
  modal:Modal|null = null;
  
  onChange = output<void>();

  calResource = resource({
    loader: () => firstValueFrom(this.calService.loadCals())
  });

  @ViewChild('modalFiltres')
  modalElement!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
      this.modal = new Modal(this.modalElement.nativeElement)
  }

  openModal() {
    this.modal!.show();
  }

  accept() {    
    this.onChange.emit();
  }
}
