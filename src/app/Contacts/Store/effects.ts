import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {ApiService} from '../../Service/Api.service'
import {contactActions, createContactActions} from './actions'
import {catchError, map, mergeMap, of, switchMap, tap} from 'rxjs'
import {IContact} from '../../Type/contact.interface'
import {IContactInfo} from '../../Type/contactinfo.interface'
import Swal from 'sweetalert2'

export const getContactEffect = createEffect(
  (action$ = inject(Actions), contactService = inject(ApiService)) => {
    return action$.pipe(
      ofType(contactActions.getContact),
      switchMap(() => {
        return contactService.getContacts().pipe(
          map((contact: IContactInfo[]) => {
            const maxid = contact.reduce(
              (max, item) => (Number(item.id) > Number(max) ? item.id : max),
              contact[0].id
            )
            return contactActions.getContactSuccess({contact, maxid})
          }),
          catchError(() => {
            return of(contactActions.getContactFailure())
          })
        )
      })
    )
  },
  {
    functional: true,
  }
)

export const createcontEffects = createEffect(
  (action$ = inject(Actions), contactService = inject(ApiService)) => {
    return action$.pipe(
      ofType(createContactActions.createContact),
      switchMap(({request}) => {
        return contactService.addContacts(request).pipe(
          switchMap(() => {
            return contactService.getContacts().pipe(
              map((contact: IContactInfo[]) => {
                const maxid = contact.reduce(
                  (max, item) => (Number(item.id) > Number(max) ? item.id : max),
                  contact[0].id
                )
                return createContactActions.createContactSuccess({
                  contact,
                  maxid,
                })
              })
            )
          }),
          catchError(() => {
            return of(createContactActions.createContactFailure())
          })
        )
      })
    )
  },
  {
    functional: true,
  }
)

export const createContactSuccess$ = createEffect(
  (action$ = inject(Actions)) => {
    return action$.pipe(
      ofType(createContactActions.createContactSuccess),
      tap(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            toast.style.padding = '5%';
          },
        });
        Toast.fire({
          // icon: 'success',
          background: '#02f480',
          html: `<span style="text-align:center; color: black;" >Contact successfully created!</span>`,
        });
    
      })
    )
  },
  {
    functional:true,
    dispatch:false
  }
)

export const createContactFailure$ = createEffect(
  (action$ = inject(Actions)) => {
    return action$.pipe(
      ofType(createContactActions.createContactFailure),
      tap(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            toast.style.padding = '5%';
          },
        });
        Toast.fire({
          // icon: 'success',
          background: '#e40211',
          html: `<span style="text-align:center; color: black;" >Create Contact Failed!</span>`,
        });
    
      })
    )
  },
  {
    functional:true,
    dispatch:false
  }
)
