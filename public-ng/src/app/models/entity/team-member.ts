import { Holder } from "../enum/holder.enum";

export interface TeamMember {
  name: string;
  is_holder: Holder;
  icon: string | null;
}