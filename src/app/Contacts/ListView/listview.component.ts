import { CommonModule, JsonPipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ApiService } from "../../Service/Api.service";
import { IContact } from "../../Type/contact.interface";
import { IContactInfo } from "../../Type/contactinfo.interface";
import { RouterLink } from "@angular/router";
import { ContactModalComponent } from "../../Shared/Modal/contactmodal.component";
import { Dialog } from "@angular/cdk/dialog";

@Component({
    selector:'app-listview',
    standalone:true,
    imports:[CommonModule,RouterLink],
    templateUrl:'./listview.component.html'
})

export class ListViewComponents implements OnInit{

   contactObj!:IContactInfo
   @Input() data!: IContactInfo


    constructor(private dialog: Dialog){}

    ngOnInit(): void {
        this.contactObj = this.data
    }

    Edit(obj:IContactInfo){
        const dialogRef = this.dialog.open(ContactModalComponent, {
            height: '400px',
            width: '380px',
            panelClass: 'contact-dialog',
            hasBackdrop: true,
            data:{isAdd:false,contact:obj}
          })
        
    }
}