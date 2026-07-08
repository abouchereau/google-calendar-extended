import { Component, ViewChild, ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'modal-pwa',
  imports: [],
  templateUrl: './modal-pwa.html',
  styleUrl: './modal-pwa.css',
})
export class ModalPwa {
  isIOs:boolean;
  isChromiumBased:boolean;

  @ViewChild('modalPwa')
  modalElement!: ElementRef<HTMLDivElement>;
  modal:Modal|null = null;


  constructor() {
        this.isIOs =  /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
        this.isChromiumBased = /chrome|crios|crmo|edg|opr|brave\//.test(navigator.userAgent.toLowerCase());
  }

  ngAfterViewInit(): void {
      this.modal = new Modal(this.modalElement.nativeElement)
  }

  openModal() {
    this.modal!.show();
  }


}
