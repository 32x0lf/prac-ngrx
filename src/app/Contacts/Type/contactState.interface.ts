import { IContact } from '../../Type/contact.interface'
import {IContactInfo} from '../../Type/contactinfo.interface'

export interface IContactStateInterface {
  isLoading: boolean
  contact: IContactInfo[]  |  null
  maxid:number
}


export interface ICreateContactStateInterface {
  isLoadingCreate: boolean
  contact: IContactInfo[]  |  null
  createmaxid:number
}