import {Component, EventEmitter, Output} from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.css'
})
export class ItemEditComponent {
  show = false;

  item!: Item;

  @Output() onApply: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  open(item: Item) {
    this.item = Object.create(item);
    this.show = true;
  }
}
