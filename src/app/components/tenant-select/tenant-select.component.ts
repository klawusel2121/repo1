import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-tenant-select',
  templateUrl: './tenant-select.component.html',
  styleUrl: './tenant-select.component.css'
})
export class TenantSelectComponent {
  tenantId: string = '';
  constructor(public authService: AuthService) { }
}
