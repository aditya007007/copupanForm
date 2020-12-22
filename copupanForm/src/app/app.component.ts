import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from '@angular/forms';
import { ControlService } from './../app/shared/control.service';
import { IFormDetail, IControl, IForm } from '../app/shared/controlnterface/control.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialougeComponent } from '../../src/app/shared/dialouge/dialouge.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public coupanForm: FormGroup;
  public iFormCallback = new BehaviorSubject<IFormDetail>(null);
  public iForm: IFormDetail;

  constructor(
    private formBuilder: FormBuilder,
    public controlService: ControlService,
    public dialog: MatDialog
  ) {
    this.getFormDataAPI();
  }

  ngOnInit() {
    this.coupanForm = this.formBuilder.group({});
  }

  public getFormData(): Observable<IFormDetail> {
    return this.iFormCallback.asObservable();
  }

  // method to add controls at run time from json
  private addContols() {
    const contols = this.iForm.controls;
    for (let i = 0; i < contols.length; i++) {
      this.coupanForm.addControl(
        contols[i].id.toString(),
        this.controlService.getFormControl(contols[i])
      )
    }
  }
  // method add controls at run time from json

  // -------- create formArray ----------
  private createformArray() {
    const arrayContols = this.iForm.controls;
    this.coupanForm = this.formBuilder.group({
      rules: this.formBuilder.array([this.newCoupan()]),
    });
    console.log(this.coupanForm)
  }
  get rules() {
    return this.coupanForm.get("rules") as FormArray
  }
  private newCoupan(): FormGroup {
    const arrayControl = {};
    const ruleArrayJson = this.iForm.rules;
    for (let i = 0; i < ruleArrayJson.length; i++) {
      arrayControl[ruleArrayJson[i].id] = this.controlService.getFormControl(ruleArrayJson[i]);
    }
    return new FormGroup(arrayControl);
  }
  // -------- creatijng formArray ----------

  // -------- adding controls from formArray ----------
  addRule() {
    this.rules.push(this.newCoupan());
  }

  // -------- deleting controls from formArray ----------
  removeRule(i: number) {
    this.rules.removeAt(i);
  }

  /* Get form json Data */
  public getFormDataAPI(): void {
    this.controlService.getFormAPIData().subscribe(
      value => {
        if (value) {
          this.iFormCallback.next(value.coupanForm);
          this.iForm = value.coupanForm;
          this.createformArray();
          this.addContols();
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  /* Get form json Data */


  /* method to show hide control on basis of control selection*/
  childVisibility(value, control, type) {
    if (control.childVisibility.hasOwnProperty("id")) {
      let childData = this.iForm.controls.filter((controls) => controls.id == control.childVisibility.id)[0]
      if (control.childVisibility.hasOwnProperty("id") && value == control.childVisibility.name) {
        childData.defaultVisibility = true;
        childData.isMandatory = true;
        this.coupanForm.controls[childData.id].setValidators(this.controlService.getValidators(childData))
        this.coupanForm.controls[childData.id].updateValueAndValidity();
        this.coupanForm.controls[childData.id].setValue("");
      }
      else if (control.childVisibility.hasOwnProperty("id") && value != control.childVisibility.name) {
        childData.defaultVisibility = false;
        childData.isMandatory = false;
        this.coupanForm.controls[childData.id].clearValidators();
        this.coupanForm.controls[childData.id].updateValueAndValidity();
        this.coupanForm.controls[childData.id].setValue("");
      }
      else {
        childData.defaultVisibility = true;
        childData.isMandatory = false;
      }
    }
  }
  /* method to show hide control on basis of control selection*/

  openDialog(json?): void {
    const dialogRef = this.dialog.open(DialougeComponent, {
      width: '450px',
      height: '650px',
      data: { data: json, type: "coupanJson" }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  /*submit method*/
  submit() {
    console.log(this.coupanForm.value);
    this.openDialog(this.coupanForm.value);
  }
  /*submit method*/
}

