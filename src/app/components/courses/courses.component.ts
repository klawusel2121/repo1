import {Component, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {FirebaseService} from "../../services/firebase.service";
import {Course} from "../../models/course";
import {CourseEditComponent} from "./course-edit/course-edit.component";

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
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.fbs.getCollection(this.source);
  }

  add() {
    const item = {name: 'COURSE'};
    this.fbs.add(this.source, item)
    setTimeout(() => {this.editItem(item);}, 100)
  }

  remove(item: Course) {
    this.fbs.remove(this.source, item.id!);
  };

  edit(item: Course) {
    this.editItem = item;
    this.modal.open(item);
  }

  onApply(item: Course) {
    this.fbs.update(this.source, this.editItem, {name: item.name});
    this.modal.show = false;
  }

  onCancel() {
    this.modal.show = false;
  }
}
