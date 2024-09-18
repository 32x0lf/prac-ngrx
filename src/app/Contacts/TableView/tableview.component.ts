import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { IContactInfo } from "../../Type/contactinfo.interface";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ContactModalComponent } from "../../Shared/Modal/contactmodal.component";
import { Dialog } from "@angular/cdk/dialog";

@Component({
    selector:'app-tableview',
    standalone:true,
    templateUrl:'./tableview.component.html',
    imports:[CommonModule,RouterLink]
})

export class TableViewComponent implements OnInit{
    
    contactObj!:IContactInfo[] | null
    @Input() data!: IContactInfo[] | null

    constructor(private dialog:Dialog,private route:ActivatedRoute){
        this.route.params.subscribe({
            next: x=> {console.log(x)}
        })
    }

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