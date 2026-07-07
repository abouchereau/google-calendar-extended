import { Holder } from "../enum/holder.enum";

export interface PersonJob {
    id: number;
    job: string;
    group: string;
    is_holder: Holder;
}

export interface Person {
    person_id: number;
    firstname: string;
    lastname: string;
    jobs: PersonJob[];
}
