import { createAction, createFeature, createReducer, on } from "@ngrx/store";
import { IContactStateInterface, ICreateContactStateInterface } from "../Type/contactState.interface";
import { contactActions, createContactActions } from "./actions";

const InitialState: IContactStateInterface = {
    isLoading:false,
    contact:null,
    maxid:0
}

const CreateInitialState: ICreateContactStateInterface = {
    isLoadingCreate:false,
    contact:null,
    createmaxid:0
}


export const contactFeature = createFeature({
    name:'contact',
    reducer:createReducer(
        InitialState,
        on(contactActions.getContact,(state)=> ({
            ...state,
            isLoading:true
        })),
        on(contactActions.getContactSuccess, (state,action) => ({
            ...state,
            isLoading:false,
            contact:action.contact,
            maxid:action.maxid
        })),
        on(contactActions.getContactFailure, (state) => ({
            ...state,
            isLoading:false
        })),
        on(createContactActions.createContact,(state) => ({
            ...state,
            isLoading:true
        })),
        on(createContactActions.createContactSuccess,(state,action) => ({
            ...state,
            isLoading:false,
            contact:action.contact,
            maxid:action.maxid
        })),
        on(createContactActions.createContactFailure, (state) => ({
            ...state,
            isLoading:false
        })),
      
    )
});


export const {
    name:contactfeaturekey,
    reducer:contactreducer,
    selectIsLoading,
    selectContact :selectContactData,
    selectMaxid
} = contactFeature
