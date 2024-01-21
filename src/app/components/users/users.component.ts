import {Component, inject, ViewChild} from '@angular/core';
import {TeacherEditComponent} from "../teachers/teacher-edit/teacher-edit.component";
import {FirebaseService} from "../../services/firebase.service";
import {TranslateService} from "@ngx-translate/core";
import {StateService} from "../../services/state.service";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  authService = inject(AuthService);
  fbs = inject(FirebaseService);
  translate = inject(TranslateService);
  stateService = inject(StateService);

  editItem: any;
  source = 'users';

  @ViewChild(UserEditComponent)
  modal: UserEditComponent = new UserEditComponent;
  admin!: User;

  ngOnInit(): void {
    this.admin = <User>this.stateService.users.find(u => u.email === this.stateService.tenants[0].email)
  }

  edit(item: Partial<User>) {
    this.editItem = item;
    this.modal.open(item);
  }

  onApply(item: User) {
    const patch = {name: item.name, role: item.role};
    this.fbs.update(this.source, this.editItem, patch);
    this.modal.show = false;
  }

  onCancel() {
    this.modal.show = false;
  }
  remove(item: User) {
    this.fbs.remove(this.source, item.id!);
  };
}
