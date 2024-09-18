import {CommonModule} from '@angular/common'
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {ListViewComponents} from './Contacts/ListView/listview.component'
import {TableViewComponent} from './Contacts/TableView/tableview.component'
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog'
import {ContactModalComponent} from './Shared/Modal/contactmodal.component'
import {ApiService} from './Service/Api.service'
import { SharedModalComponent } from './Shared/Modal/SharedModalTest/sharedmodal.component'
import { ModalService } from './Service/modal.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,SharedModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent  {
  title = 'prac3'
  modalService = inject(ModalService)
  
 
 
}
