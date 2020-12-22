export interface IForm {
    coupanForm: IFormDetail
}
export interface IControl {
    id: string;
    label: string;
    regex: string;
    maxLength: string;
    minLength: string;
    placeHolder: string;
    sequence: string;
    isMandatory: boolean;
    options: any;
    width:string;
    value: string;
    defaultVisibility: boolean;
    childVisibility: any
}

export interface IFormDetail {
    details: string;
    controls: Array<IControl>;
    rules: Array<IControl>;
}
