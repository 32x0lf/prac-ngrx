import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { map, Observable } from "rxjs";
import { IContactInfo } from "../Type/contactinfo.interface";
import { IContact } from "../Type/contact.interface";

@Injectable({
    providedIn:'root'
})

export class ApiService {
    private readonly apiUrl = environment.apiUrl

    constructor(private http:HttpClient){}

    // getContact(response:IContact):IContactInfo[] {
    //     return response.contact
    //   }

    getContacts():Observable<IContactInfo[]>{
        return this.http.get<IContactInfo[]>(this.apiUrl)
    }

    addContacts(newContacts:IContactInfo):Observable<IContactInfo>{
        return this.http.post<IContactInfo>(this.apiUrl,newContacts)
    }

    updateContact(updatedContact:IContactInfo){
        return this.http.put(this.apiUrl + updatedContact.id,updatedContact);
    }
}