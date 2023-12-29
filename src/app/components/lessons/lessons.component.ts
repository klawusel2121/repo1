import {Component, ViewChild} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {TranslateService} from "@ngx-translate/core";
import {LessonEditComponent} from "./lesson-edit/lesson-edit.component";
import {Lesson} from "../../models/lesson";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent {
  editItem: any;
  source = 'lessons';

  @ViewChild(LessonEditComponent)
  modal: LessonEditComponent = new LessonEditComponent;

  constructor(
    private fbs: FirebaseService,
    private translate: TranslateService,
    public stateService: StateService
  ) {

  }

  add() {
    const maxPosition = Math.max(...this.stateService.lessons.map(i => i.position)) ?? 0;
    const name = this.translate.instant('App.Lesson.Lesson')
    const item = {position: maxPosition +1, name: name, isNew: true};
    setTimeout(() => {
      this.edit(item);
    }, 100)
  }

  remove(item: Lesson) {
    this.fbs.remove(this.source, item.id!);
  };

  edit(item: Partial<Lesson>) {
    if (!('isNew' in item)) {
      item.isNew = false;
    }
    this.editItem = item;
    this.modal.open(item);
  }

  onApply(item: Lesson) {
    const patch = {position: item.position, name: item.name, from: item.from, to: item.to};
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

}
