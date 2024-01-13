import {Component, inject, ViewChild} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {TranslateService} from "@ngx-translate/core";
import {StateService} from "../../services/state.service";
import {PlanEditComponent} from "./plan-edit/plan-edit.component";
import {Plan} from "../../models/plan";
import _ from "lodash";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent {
  fbs = inject(FirebaseService);
  translate = inject(TranslateService);
  stateService = inject(StateService);

  editItem: any;
  messageId = '';
  source = 'plans';

  @ViewChild(PlanEditComponent)
  modal: PlanEditComponent = new PlanEditComponent;


  add() {
    const name = this.translate.instant('App.Plan.Plan')
    const item = {name: name, isNew: true};
    setTimeout(() => {
      // @ts-ignore
      this.edit(item);
    }, 100)
  }

  remove(item: Plan) {
    this.fbs.remove(this.source, item.id!);
  };

  edit(item: Partial<Plan>) {
    if (!('isNew' in item)) {
      item.isNew = false;
      // @ts-ignore
    }
    if (!item.isNew) {
      item = this.stateService.plans.find(p => p.id == item.id)!;
    }
    this.editItem = _.cloneDeep(item);
    this.modal.open(item);
  }

  onApply(item: Plan) {
    console.log('onApply', item)
    const patch = {
      name: item.name, groupName: item.groupName,
      groupId: item.groupId, items: item.items,
      active: item.active
    };
    if (this.editItem.isNew) {
      this.editItem.isNew = false;
      this.fbs.add(this.source, {...this.editItem, ...patch});
    } else {
      this.fbs.update(this.source, this.editItem, patch);
    }

    this.modal.show = false;
  }

  onCancel() {
    this.modal.show = false;
  }

  copy(item: Plan) {
    const updatePatch = { };
    this.fbs.update(this.source, item, updatePatch);

    delete item.id;
    const copy = _.cloneDeep(item);
    const copyPatch = { name: this.translate.instant('App.Message.CopyOf') + item.name };
    this.fbs.add(this.source, {...item, ...copyPatch});
  }
}
