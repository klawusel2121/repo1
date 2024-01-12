import {Component, inject, Input} from '@angular/core';
import {StateService} from "../../../services/state.service";
import {BrowserComponent} from "../browser.component";
import {LessonType} from "../../../models/lesson-type";

@Component({
  selector: 'app-browser-cells',
  templateUrl: './browser-cells.component.html',
  styleUrl: './browser-cells.component.css'
})
export class BrowserCellsComponent {
  stateService = inject(StateService);

  @Input() browserComponent!: BrowserComponent;

  days = this.stateService.days;
  lessons = this.stateService.lessons;
  openDays = this.days[0]?.items.filter(i => i.open);
  protected readonly LessonType = LessonType;
}
