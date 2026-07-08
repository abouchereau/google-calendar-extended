import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'admin-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-footer.html',
  styleUrl: './admin-footer.css',
})
export class AdminFooter {

  userService = inject(UserService);

  logout(event: MouseEvent): void {
    event.preventDefault();
    this.userService.unregister();
    window.location.reload();
  }
}
