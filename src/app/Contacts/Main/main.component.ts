import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ContactModalComponent } from "../../Shared/Modal/contactmodal.component";
import { ApiService } from "../../Service/Api.service";
import { Dialog } from "@angular/cdk/dialog";
import { ListViewComponents } from "../ListView/listview.component";
import { TableViewComponent } from "../TableView/tableview.component";
import { Store } from "@ngrx/store";
import { contactActions } from "../Store/actions";
import { IContact } from "../../Type/contact.interface";
import { IContactInfo } from "../../Type/contactinfo.interface";
import { combineLatest, first, last, take } from "rxjs";
import { selectContactData, selectIsLoading, selectMaxid } from "../Store/reducers";
import { ModalService } from "../../Service/modal.service";

@Component({
    selector:'app-main',
    templateUrl:'./main.component.html',
    standalone:true,
    imports:[CommonModule,ListViewComponents, TableViewComponent]
})

export class MainComponent implements OnInit, OnChanges {
    title = 'prac3'
  
    isListView = true
    contacts:IContactInfo[]=[]

    data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      contacts:this.store.select(selectContactData),
      maxid: this.store.select(selectMaxid)
    })
    
  
    constructor(
      private dialog: Dialog,
      private cd: ChangeDetectorRef,
      private apiService: ApiService,
      private store:Store,
      private modalService:ModalService
    ) {}


  
    ngOnInit(): void {
      this.getData()
      let x = 0;
      this.data$.pipe(last()).subscribe(({maxid}) => {
        this.GetID(maxid)
      })
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      alert(changes)
    }

    GetID(id:any){
      console.log('id',id)
    }
  
    AddContact() {
      // const dialogRef = this.dialog.open(ContactModalComponent, {
      //   height: '400px',
      //   width: '380px',
      //   panelClass: 'contact-dialog',
      //   hasBackdrop: true,
      //   data:{isAdd:true,contact:null}
      // })

      //this is another implementation
      this.modalService.showModal.set(true);
    }
  
    getData() {
      this.store.dispatch(contactActions.getContact())
    }
  
    viewOpt(val: boolean) {
      this.isListView = val
    }
  
    Refresh(event: Event): void {
      this.cd.detectChanges
      console.log(event)
      alert('this is parent')
    }
  
    ListViewContact(event: any): void {
      alert(event.target.value)
    }
  }