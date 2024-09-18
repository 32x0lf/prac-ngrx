import { inject, Injectable, signal } from "@angular/core";
import { IContactInfo } from "../Type/contactinfo.interface";

@Injectable({
    providedIn:'root'
})

export class ModalService{
    model = signal<IContactInfo>({id:'',contactname:'',contactemail:'',contactnumber:''});
    showModal = signal(false);
    isAdd = signal(true);
    
    test =  signal<IContactInfo[]>([]);
    getContactModel(){
        return this.model();
    }
}