import {DialogRef} from '@angular/cdk/dialog'
import {CommonModule} from '@angular/common'
import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {DIALOG_DATA} from '@angular/cdk/dialog'
import {IContactInfo} from '../../Type/contactinfo.interface'


@Component({
  selector: 'contact-dialog',
  templateUrl: './contactmodal.component.html',
  styleUrl: './contactmodal.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ContactModalComponent implements OnInit {
  //form: FormGroup = new FormGroup({})
  form = this.fb.nonNullable.group({
    name: new FormControl('', Validators.required),
    phnumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
  })

  @Output() saveChanges: EventEmitter<any> = new EventEmitter()
  isAddContact!: boolean
  submitBtnStr: string = 'Add Contact'
  isDisabled!: boolean
  isFormValid!: boolean

  constructor(
    private fb: FormBuilder,
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: {isAdd: boolean; contact: IContactInfo}
  ) {}

  ngOnInit(): void {
    //this.InitiliazeForm();
    this.submitBtnStr = this.data.isAdd ? 'Add Contact' : 'Save Changes'
    this.isDisabled = this.data.isAdd ? true : false
    //this.isFormValid = this.data.isAdd ? false : true
    this.data.isAdd ? null : this.patchVvalue();
  }

  patchVvalue(){
    this.form.patchValue({
        name:this.data.contact.contactname,
        phnumber:this.data.contact.contactnumber,
        email:this.data.contact.contactemail
    })
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      // alert('yes')
      const test = this.form.getRawValue();
      const request : IContactInfo = {
        id:'',
        contactname:String(test.name),
        contactemail:String(test.email),
        contactnumber:String(test.phnumber)
      }
      this.saveChanges.emit(null)
      this.Close()
    }
  }

  
  Close() {
    this.dialogRef.close()
  }
}
