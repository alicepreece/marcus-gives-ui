import {Component} from "@angular/core";
import {UpdatePreferencesModalService} from "./update-preferences-modal.service";
import {Client} from "../../models/client.model";

@Component({
  selector: 'client-preference-modal-component',
  templateUrl: './update-preferences-modal.component.html',
  styleUrls: ['./update-preferences-modal.component.scss']
})
export class UpdatePreferencesModalComponent {
  client: Client;

  constructor(private updatePreferenceModalService: UpdatePreferencesModalService){}

  ngOnInit(): void {
    this.client = this.updatePreferenceModalService.client
  }

  ngOnDestroy(): void {}

  closeModal(): void{
    this.updatePreferenceModalService.closeModal();
  }
}
