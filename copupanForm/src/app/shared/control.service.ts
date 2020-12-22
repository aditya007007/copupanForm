import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { IForm, IControl } from '../shared/controlnterface/control.interface';
import { delay, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ControlService {
  private formGroup: FormGroup;
  private iForm: IForm;
  private formDetail: BehaviorSubject<IForm>;

  constructor(private http: HttpClient) { }

  public getFormControl(control: IControl): FormControl {
    return new FormControl('', this.getValidators(control));
  }

  public getValidators(control: IControl): any[] {
    const validatorsArray = [];
    if (this.isMandatory(control)) {
      validatorsArray.push(Validators.required);
    }
    if (this.isRegex(control)) {
      validatorsArray.push(Validators.pattern(control.regex));
    }
    if (this.isMinLength(control)) {
      validatorsArray.push(Validators.minLength(+control.minLength));
    }
    if (this.isMaxLength(control)) {
      validatorsArray.push(Validators.maxLength(+control.maxLength));
    }
    return validatorsArray;
  }

  /* method for Configuring Question Is Mandatory */
  public isMandatory(question: IControl): boolean {
    if (question.isMandatory) {
      return question.isMandatory;
    } else { return false; }
  }
  /* method for Configuring Question Is Mandatory */

  /* method for Configuring Regex in formControl */
  public isRegex(control: IControl): boolean {
    /* This method check that if regex has length > 1 then return true othrwise false */
    return control.regex && control.regex.length > 1;
    /* End of this This method check that if regex has length > 1 then return true othrwise false */
  }
  /* method for Configuring Regex in formControl */

  /* method for configuring min length */
  public isMinLength(control: IControl): boolean {
    return control.minLength !== '' && control.minLength !== null && !isNaN(+control.minLength);
  }
  /* method for configuring min length */

  /* method for Configuring Max Length */
  public isMaxLength(control: IControl) {
    return control.maxLength !== '' && control.maxLength !== null && !isNaN(+control.maxLength);
  }
  /* End of  method for Configuring Max Length */


  public getFormAPIData(): Observable<IForm> {
    this.formDetail = new BehaviorSubject<IForm>(null);
    const timeStamp = new Date().getTime();
    this.http.get(`/assetsDetails/data/control.json?${timeStamp}`).pipe(delay(2)).subscribe((resp: any) => {
      this.iForm = resp;
      this.formDetail.next(this.iForm);
    });
    return this.formDetail;
  }
  public getFormData(): IForm {
    return this.iForm;
  }

}
