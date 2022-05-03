import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {Questions} from "../../models/questions.enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Client} from "../../models/client.model";
import {RoleEnum} from "../../models/role.enum";
import {User} from "../../models/user.model";
import {Scores} from "../../models/scores.model";
import {ClientRequestService} from "../../services/client-request.service";
import {RegionEnum} from "../../models/region.enum";
import {Subscription} from "rxjs";
import {FeesEnum} from "../../models/fees.enum";

@Component({
  selector: 'client-questions-component',
  templateUrl: './client-questions.component.html',
  styleUrls: ['./client-questions.component.scss']
})
export class ClientQuestionsComponent implements OnInit, OnDestroy {
  @Input() defaultClient: Client | undefined;
  createClientForm: FormGroup;
  questions = Questions;
  @Output() closeClient: EventEmitter<any> = new EventEmitter<any>()
  subscriptions: Subscription = new Subscription();
  submitButtonName: string;
  update: boolean;
  FeesEnum = FeesEnum;
  RegionEnum = RegionEnum;

  constructor( private formBuilder: FormBuilder, private clientRequestService: ClientRequestService) {
  }

  ngOnInit(): void {
    if (this.defaultClient != undefined) {
      this.submitButtonName = "Update Profile";
      this.update = true;
    } else {
      this.submitButtonName = "Create Client";
      this.update = false
    }
    this.createClientForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      accountnumber: [{value: this.defaultClient?.accountNumber, disabled:this.update}, Validators.required],
      advisorteam: [{value: this.defaultClient?.advisorTeam, disabled:this.update} ,Validators.required],
      donationamount: ['', Validators.required],
      qu1: [''],
      qu2: [''],
      qu3: [''],
      qu4: [''],
      qu5: [''],
      qu6: [''],
      qu7: [''],
      qu8a: [''],
      qu8b: [''],
      qu8c: [''],
      qu8d: [''],
      qu8e: [''],
      qu8f: [''],
      qu8g: [''],
      qu8h: [''],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get form() { return this.createClientForm.controls; }

  onSubmit(): void {
    let client = this.createClient();
    if (this.defaultClient) {
      client.id = this.defaultClient.id;
      client.donations = this.defaultClient.donations;
      client.pastDonations = this.defaultClient.pastDonations;
      this.subscriptions.add(this.clientRequestService.updateClient((client)).subscribe());
    } else {
      this.subscriptions.add(this.clientRequestService.createClient(client).subscribe());
    }
    this.closeClient.emit()
  }

  formIncomplete(): boolean {
    return this.createClientForm.invalid
  }

  createClient(): Client {
    let client: Client = new Client();
    client.user = new User();
    client.scores = new Scores();
    client.user.firstName = this.form['firstname'].value;
    client.user.lastName = this.form['lastname'].value;
    client.user.username = client.user.firstName[0].toLowerCase() + client.user.lastName.toLowerCase();
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
    if (this.form['qu8a'].value) {
      region.push(RegionEnum.SAMERICA)
    }
    if(this.form['qu8b']?.value) {
      region.push(RegionEnum.NAMERICA)
    }
    if(this.form['qu98c']?.value) {
      region.push(RegionEnum.AFRICA)
    }
    if(this.form['qu8d']?.value) {
      region.push(RegionEnum.EUROPE)
    }
    if(this.form['qu8e']?.value) {
      region.push(RegionEnum.MEAST)
    }
    if(this.form['qu8f']?.value) {
      region.push(RegionEnum.CANDSASIA)
    }
    if(this.form['qu8g']?.value) {
      region.push(RegionEnum.EANDSEASIA)
    }
    if(this.form['qu8h']?.value) {
      region.push(RegionEnum.OCEANIA)
    }
    client.scores.region = region
    return client;
  }
}
