import { ResolveFn } from '@angular/router';
import { Person } from '../../models/entity/person';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { PersonService } from '../../services/person.service';
import { inject } from '@angular/core/primitives/di';

export const AdminPersonListResolver: ResolveFn<any> = async (route, state) => {

    const personService = inject(PersonService);
    const persons: Person[] = await firstValueFrom(personService.getAllPersons());

    return {
        persons
    };
}

