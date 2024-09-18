import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {IContactInfo} from '../../Type/contactinfo.interface'
import {IContact} from '../../Type/contact.interface'

export const contactActions = createActionGroup({
  source: 'contact',
  events: {
    'Get Contact': emptyProps(),
    'Get Contact Success': props<{contact: IContactInfo[]; maxid: any}>(),
    'Get Contact Failure': emptyProps(),
  },
});

export const createContactActions = createActionGroup({
  source: 'create contact',
  events: {
    'Create Contact': props<{request: IContactInfo}>(),
    'Create Contact Success': props<{contact: IContactInfo[];maxid:any}>(),
    'Create Contact Failure': emptyProps(),
  },
})
