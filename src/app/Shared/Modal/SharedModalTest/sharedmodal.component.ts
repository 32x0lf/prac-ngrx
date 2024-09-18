import {CommonModule} from '@angular/common'
import {Component, inject, OnInit} from '@angular/core'
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {ModalService} from '../../../Service/modal.service'
import {IContactInfo} from '../../../Type/contactinfo.interface'
import {Store} from '@ngrx/store'
import {combineLatest, take} from 'rxjs'
import {
  selectContactData,
  selectIsLoading,
  selectMaxid,
} from '../../../Contacts/Store/reducers'
import { createContactActions } from '../../../Contacts/Store/actions'

@Component({
  selector: 'shared-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './sharedmodal.component.css',
  templateUrl: './sharedmodal.component.html',
})
export class SharedModalComponent implements OnInit {
  //modalService = inject(ModalService);

  form = this.fb.nonNullable.group({
    name: new FormControl('', Validators.required),
    phnumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
  })

  // @Output() saveChanges: EventEmitter<any> = new EventEmitter()
  isAddContact!: boolean
  submitBtnStr: string = 'Add Contact'
  isDisabled!: boolean
  isFormValid!: boolean

  private contact = this.modalService.getContactModel()

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private store: Store
  ) {}

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
  })
 
  ngOnInit(): void {
    //this.InitiliazeForm();
    this.submitBtnStr = this.modalService.isAdd()
      ? 'Add Contact'
      : 'Save Changes'
    this.isDisabled = this.modalService.isAdd() ? true : false
    //this.isFormValid = this.data.isAdd ? false : true
    this.modalService.isAdd() ? null : this.patchVvalue()
  }

  patchVvalue() {
    this.form.patchValue({
      name: this.contact.contactname,
      phnumber: this.contact.contactnumber,
      email: this.contact.contactemail,
    })
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      // alert('yes')
      const test = this.form.getRawValue()
      let idnum = 0;
      let isshowModal:boolean = true;
      this.store.select(selectMaxid).pipe(take(1)).subscribe(id=> idnum = id);
      this.store.select(selectIsLoading).pipe(take(1)).subscribe(isshow=> isshowModal = isshow);
      //debugger
      const request: IContactInfo = {
        id:String(Number(idnum) + 1) ,
        contactname: String(test.name),
        contactemail: String(test.email), 
        contactnumber: String(test.phnumber),
      }

      if (this.modalService.isAdd()) {
        this.store.dispatch(createContactActions.createContact({request}));      
      }
      else{}
      this.closeModal(isshowModal);
    }
  }

  

  closeModal(value: any) {
    this.form.reset()
    this.modalService.showModal.set(value)
  }
}
