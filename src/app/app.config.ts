import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core'
import {provideRouter} from '@angular/router'


import {routes} from './app.routes'
import {provideHttpClient} from '@angular/common/http'
import { DEFAULT_DIALOG_CONFIG } from '@angular/cdk/dialog'
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { contactfeaturekey, contactreducer  } from './Contacts/Store/reducers'
import { provideEffects } from '@ngrx/effects'
import * as contactEffects from './Contacts/Store/effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState(contactfeaturekey,contactreducer),
    //provideState(createcontactfeaturekey,createcontactReducer),
    provideHttpClient(),
    { provide: DEFAULT_DIALOG_CONFIG, useValue: { hasBackdrop: true } },
    provideEffects(contactEffects),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode,
        autoPause: true,
        trace: false,
        traceLimit: 75
    }),
],
}
