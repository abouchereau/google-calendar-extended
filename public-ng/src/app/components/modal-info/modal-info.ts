import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'modal-info',
  standalone: true,
  templateUrl: './modal-info.html',
  styleUrl: './modal-info.css',
})
export class ModalInfo implements AfterViewInit {

  text = '';
  private modal: Modal | null = null;

  @ViewChild('modalInfo')
  modalElement!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.modal = new Modal(this.modalElement.nativeElement);
  }

  open(text: string): void {
    this.text = text;
    this.modal?.show();
  }

}
