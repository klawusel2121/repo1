import {Component, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {FirebaseService} from "../../services/firebase.service";
import {Course} from "../../models/course";
import {CourseEditComponent} from "./course-edit/course-edit.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  items$: Observable<any[]> = of([]);
  editItem: any;
  source = 'courses';

  @ViewChild(CourseEditComponent)
  modal: CourseEditComponent = new CourseEditComponent;

  constructor(
    private fbs: FirebaseService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.fbs.getCollection(this.source);
  }

  add() {
    const name = this.translate.instant('App.Course.Course')
    const item = {name: name, isNew: true};
    setTimeout(() => {this.edit(item);}, 100)
  }

  remove(item: Course) {
    this.fbs.remove(this.source, item.id!);
  };

  edit(item: Partial<Course>) {
    this.editItem = item;
    this.modal.open(item);
  }

  onApply(item: Course) {
    const patch = {name: item.name};
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
