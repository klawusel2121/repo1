import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {TranslateService} from "@ngx-translate/core";
import {LessonEditComponent} from "./lesson-edit/lesson-edit.component";
import {Lesson} from "../../models/lesson";
import {StateService} from "../../services/state.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import _ from "lodash";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit {
  editItem: any;
  source = 'lessons';
  lessons : Array<Lesson> = [];
  @ViewChild(LessonEditComponent)
  modal: LessonEditComponent = new LessonEditComponent;

  constructor(
    private fbs: FirebaseService,
    private translate: TranslateService,
    public stateService: StateService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit(): void {
    this.message.info(this.translate.instant('App.Message.ReorderLessons'));
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
    const patch = {
      position: item.position, name: item.name, from: item.from, to: item.to, type: item.type};
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

  drop(event: CdkDragDrop<any[]>): void {
    console.log('drop', event);
    moveItemInArray(this.stateService.lessons, event.previousIndex, event.currentIndex);

    let position = 1;
    this.stateService.lessons.forEach(item => {
      item.position = position++;
      this.fbs.remove(this.source, item.id!);
      this.fbs.add(this.source, item);
    });

    // moveItemInArray(this.lessons, event.previousIndex, event.currentIndex);
  }
}
