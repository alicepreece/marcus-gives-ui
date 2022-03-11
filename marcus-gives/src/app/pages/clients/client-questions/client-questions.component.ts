import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {Questions} from "../../../models/questions.enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Client} from "../../../models/client.model";
import {RoleEnum} from "../../../models/role.enum";
import {User} from "../../../models/user.model";
import {Scores} from "../../../models/scores.model";
import {ClientRequestService} from "../../../services/client-request.service";
import {RegionEnum} from "../../../models/region.enum";
import {Subscription} from "rxjs";

@Component({
  selector: 'client-questions-component',
  templateUrl: './client-questions.component.html',
  styleUrls: ['./client-questions.component.scss']
})
export class ClientQuestionsComponent implements OnInit, OnDestroy {
  createClientForm: FormGroup;
  questions = Questions;
  @Output() closeClient: EventEmitter<any> = new EventEmitter<any>()
  subscriptions: Subscription = new Subscription();

  constructor( private formBuilder: FormBuilder, private clientRequestService: ClientRequestService) {
  }

  ngOnInit(): void {
    this.createClientForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      accountnumber: ['', Validators.required],
      advisorteam: ['', Validators.required],
      donationamount: ['', Validators.required],
      qu1: [''],
      qu2: [''],
      qu3: [''],
      qu4: [''],
      qu5: [''],
      qu6: [''],
      qu7: [''],
      qu8: [''],
      qu9a: [''],
      qu9b: [''],
      qu9c: [''],
      qu9d: [''],
      qu9e: [''],
      qu9f: [''],
      qu9g: ['']
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get form() { return this.createClientForm.controls; }

  onSubmit(): void {
    let client = this.createClient();
    this.subscriptions.add(this.clientRequestService.createClient(client).subscribe());
    this.closeClient.emit()
  }

  formIncomplete(): boolean {
    return this.createClientForm.invalid
  }

  createClient(): Client {
    let client: Client = new Client();
    client.user = new User();
    client.scores = new Scores();
    console.log(this.form);
    client.user.firstName = this.form['firstname'].value;
    client.user.lastName = this.form['lastname'].value;
    client.user.username = client.user.firstName[0].toLowerCase() + client.user.lastName;
    client.user.role = RoleEnum.CLIENT;
    client.user.password = client.user.firstName[0].toLowerCase() + client.user.lastName[0].toLowerCase() + '!password';
    client.accountNumber = this.form['accountnumber'].value;
    client.advisorTeam = this.form['advisorteam'].value;
    client.investableAmount = this.form['donationamount'].value;
    client.emailAddress = this.form['email'].value;
    client.scores.id = -1;
    client.scores.socialOverEnv = this.form['qu1'].value;
    client.scores.economyOverHealthcare = this.form['qu2'].value;
    client.scores.povertyOverEducation = this.form['qu3'].value;
    client.scores.targetedOverDiverse = this.form['qu4'].value;
    client.scores.managementFees = this.form['qu5'].value;
    client.scores.esgOverAll = this.form['qu6'].value;
    client.scores.shortOverLongTerm = this.form['qu7'].value;
    let region = [];
    if (this.form['qu9a'].value) {
      region.push(RegionEnum.SAMERICA)
    }
    if(this.form['qu9b']?.value) {
      region.push(RegionEnum.NAMERICA)
    }
    if(this.form['qu9c']?.value) {
      region.push(RegionEnum.AFRICA)
    }
    if(this.form['qu9d']?.value) {
      region.push(RegionEnum.EUROPE)
    }
    if(this.form['qu9e']?.value) {
      region.push(RegionEnum.MEAST)
    }
    if(this.form['qu9f']?.value) {
      region.push(RegionEnum.CANDSASIA)
    }
    if(this.form['qu9g']?.value) {
      region.push(RegionEnum.EANDSEASIA)
    }
    if(this.form['qu9h']?.value) {
      region.push(RegionEnum.OCEANIA)
    }
    client.scores.region = region
    return client;
  }

}
