import { Component } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(
    private storageService: StorageService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout(): void {
    // this.accountService.logout().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.storageService.clean();
    //     window.location.reload();
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }
}
