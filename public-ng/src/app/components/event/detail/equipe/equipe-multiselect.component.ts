import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SelectionOption {
  id: number;
  name: string;
  is_holder?: number;
}

@Component({
  selector: 'app-equipe-multiselect',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equipe-multiselect.component.html',
  styleUrl: './equipe-multiselect.component.css',
})
export class EquipeMultiselectComponent implements OnInit, OnChanges {
  @Input() options: SelectionOption[] = [];
  @Input() selected: SelectionOption[] = [];
  @Input() placeholder: string = 'Select items...';
  @Input() tagPlaceholder: string = 'Press Enter to add';
  @Input() disabled: boolean = false;

  @Output() select = new EventEmitter<SelectionOption>();
  @Output() remove = new EventEmitter<SelectionOption>();
  @Output() addTag = new EventEmitter<string>();
  @Output() change = new EventEmitter<void>();

  isOpen = false;
  searchText = '';
  filteredOptions: SelectionOption[] = [];
  inputValue = '';

  ngOnInit(): void {
    this.filteredOptions = this.options;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] || changes['selected']) {
      this.updateFilteredOptions();
    }
  }

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  updateFilteredOptions(): void {
    const searchLower = this.searchText.toLowerCase();
    this.filteredOptions = this.options.filter(
      (opt) =>
        opt.name.toLowerCase().includes(searchLower) &&
        !this.selected.some((s) => s.name === opt.name)
    );
  }

  onSearch(text: string): void {
    this.searchText = text;
    this.updateFilteredOptions();
  }

  onOptionClick(option: SelectionOption): void {
    if (!this.selected.some((s) => s.name === option.name)) {
      this.select.emit(option);
    }
    this.isOpen = false;
  }

  onRemoveTag(option: SelectionOption): void {
    this.remove.emit(option);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.inputValue.trim()) {
      event.preventDefault();
      this.addTag.emit(this.inputValue.trim());
      this.inputValue = '';
      this.searchText = '';
      this.updateFilteredOptions();
      this.change.emit();
    }
  }

  getTagClass(option: SelectionOption): string {
    const holder = option.is_holder;
    if (holder === 1) return 'tag bg-success';
    if (holder === -1) return 'tag bg-danger';
    return 'tag bg-warning';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.multiselect-container')) {
      this.isOpen = false;
    }
  }

  closeDropdown(): void {
    this.isOpen = false;
  }
}
