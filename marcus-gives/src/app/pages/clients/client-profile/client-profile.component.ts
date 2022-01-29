import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'client-profile-component',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  clientId: number;

  constructor() {
  }

  ngOnInit(): void {
  }
}
