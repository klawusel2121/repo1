import {Component, inject, Input, OnInit} from '@angular/core';
import {BrowserComponent, BrowserModes} from "../browser.component";
import {StateService} from "../../../services/state.service";
import {PlanItem} from "../../../models/plan-item";
import {TranslateService} from "@ngx-translate/core";

export interface BrowserCell {
  row1: string;
  row2: string;
  row3: string;
}

@Component({
  selector: 'app-browser-cell',
  templateUrl: './browser-cell.component.html',
  styleUrl: './browser-cell.component.css'
})
export class BrowserCellComponent implements OnInit {
  stateService = inject(StateService);
  translate = inject(TranslateService);

  private emptyCell = { row1: '', row2: '', row3: '' };

  @Input() c!: number;
  @Input() r!: number;
  @Input() browserComponent!: BrowserComponent;
  cell: BrowserCell = this.emptyCell;

  ngOnInit(): void {
    this.browserComponent.id$.subscribe(id => {
      const mode: BrowserModes = this.browserComponent.form.get('mode')!.value;
      console.log('id changed', id)
      const items: Array<Partial<PlanItem>> = [];
      this.cell = this.emptyCell;
      if (mode === BrowserModes.teacher) {
        const teacherId = this.browserComponent.form.get('teacherId')!.value;
        this.stateService.plans.filter(plan => plan.active).forEach(plan => {
          const matching = plan.items
            .filter(item =>
              item.day === this.c && item.lesson === this.r && item.teacherIds!.indexOf(teacherId) !== -1)
          matching.forEach(match => (match as any).groupId = plan.groupId)
          items.push(...matching);
          if (items[0]) {
            this.browserComponent.itemCount++;
            this.cell = {
              row1: this.courseName(items[0]?.courseId as string),
              row2: this.translate.instant('App.Group.Group') + ' ' + this.groupName((items[0] as any)?.groupId),
              row3: this.translate.instant('App.Room.Room') + ' ' + this.roomName(items[0]?.roomId as string),
            }
          }
        })
      }
      if (mode === BrowserModes.room) {
        const roomId = this.browserComponent.form.get('roomId')!.value;
        this.stateService.plans.filter(plan => plan.active).forEach(plan => {
          const matching = plan.items
            .filter(item =>
              item.day === this.c && item.lesson === this.r && item.roomId === roomId)
          matching.forEach(match => (match as any).groupId = plan.groupId)
          items.push(...matching);
          if (items[0]) {
            this.browserComponent.itemCount++;
            this.cell = {
              row1: this.courseName(items[0]?.courseId as string),
              row2: this.translate.instant('App.Group.Group') + ' ' + this.groupName((items[0] as any)?.groupId),
              row3: this.translate.instant('App.Teacher.Teachers') + ' ' + this.teachersShort((items[0]?.teacherIds as Array<string>)),
            }
          }
        })
      }
      if (mode === BrowserModes.group) {
        const groupId = this.browserComponent.form.get('groupId')!.value;
        this.stateService.plans.filter(plan => plan.active && plan.groupId === groupId).forEach(plan => {
          const matching = plan.items
            .filter(item =>
              item.day === this.c && item.lesson === this.r)
          matching.forEach(match => (match as any).groupId = plan.groupId)
          items.push(...matching);
          if (items[0]) {
            this.browserComponent.itemCount++;
            this.cell = {
              row1: this.courseName(items[0]?.courseId as string),
              row2: this.translate.instant('App.Room.Room') + ' ' + this.roomName((items[0] as any)?.roomId),
              row3: this.translate.instant('App.Teacher.Teachers') + ' ' + this.teachersShort((items[0]?.teacherIds as Array<string>)),
            }
          }
        })
      }
    });
  }

  groupName(id: string): string {
    return this.stateService.groups.find(g => g.id === id)?.name ?? '';
  }

  courseName(id: string): string {
    return this.stateService.courses.find(g => g.id === id)?.name ?? '';
  }

  roomName(id: string): string {
    return this.stateService.rooms.find(g => g.id === id)?.name ?? '';
  }

  teachersShort(ids: Array<string>): string {
    let shorts = '';
    ids.forEach(id => {
      shorts += this.stateService.teachers.find(g => g.id === id)?.short ?? '';
      shorts += ',';
    })
    if (shorts === '') {
      return shorts;
    }
    return shorts.substring(0, shorts.length-1);
  }
}
