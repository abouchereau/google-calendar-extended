import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../../models/entity/person';
import { ActivatedRoute } from '@angular/router';
import { Holder } from '../../models/enum/holder.enum';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { PersonService } from '../../services/person.service';
import { LoaderService } from '../../services/loader.service';
import { AdminFooter } from '../admin-footer/admin-footer';


@Component({
  selector: 'app-admin-person-list',
  imports: [FormsModule, AdminFooter],
  templateUrl: './admin-person-list.html',
  styleUrl: './admin-person-list.css',
})
export class AdminPersonList {

  firstname: string = "";
  lastname: string = "";
  persons: Person[] = [];
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly personService = inject(PersonService);
  private readonly loader = inject(LoaderService);

  Holder = Holder;
  constructor() {
    this.persons = this.route.snapshot.data['data'].persons;
  }

  private async reloadPersons(): Promise<void> {
    this.persons = await firstValueFrom(this.personService.getAllPersons());
  }

  openPerson(person_id: number, event?: MouseEvent) {
    const url = ['/admin/person/edit', person_id];
    if (event?.ctrlKey || event?.metaKey) {
      window.open(this.router.serializeUrl(this.router.createUrlTree(url)), '_blank');
      return;
    }
    this.router.navigate(url);
  }

  async deletePerson(person_id: number): Promise<void> {
    const person = this.persons.find(e => e.person_id === person_id);
    if (!person) {
      return;
    }

    if (!confirm(`Veux-tu vraiment supprimer ${person.firstname} ${person.lastname}`)) {
      return;
    }

    this.loader.show();
    try {
      await firstValueFrom(this.personService.deletePerson(person_id));
      await this.reloadPersons();
    } finally {
      this.loader.hide();
    }
  }

  async addPerson(): Promise<void> {
    if (!this.firstname || !this.lastname) {
      return;
    }

    this.loader.show();
    try {
      await firstValueFrom(this.personService.addPerson(this.firstname, this.lastname));
      this.firstname = '';
      this.lastname = '';
      await this.reloadPersons();
    } finally {
      this.loader.hide();
    }
  }
}
