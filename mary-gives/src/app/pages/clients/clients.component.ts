import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user.model";
import {RoleEnum} from "../../models/role.enum";

@Component({
  selector: 'clients-page-component',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clientUsername: string | undefined = undefined;
  user: User;
  isClientProfile: boolean = false;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    console.log('[ClientComponent] onInit');
    if (this.authenticationService.userValue) {
      console.log('Client component', this.authenticationService.userValue);
      this.user = this.authenticationService.userValue!;
      if (this.user?.role === RoleEnum.CLIENT) {
        this.isClientProfile = true;
      } else {
        this.isClientProfile = false;
      }
    }
  }
}
