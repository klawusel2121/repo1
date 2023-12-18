import {Component, OnInit, ViewChild} from '@angular/core';
import {filter, Observable, of} from "rxjs";
import {FirebaseService} from "../../services/firebase.service";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {ItemEditComponent} from "./item-edit/item-edit.component";
import {Item} from "./item";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {
  items$: Observable<any[]> = of([]);
  editItem: any;
  private itemsCount: number = 0;

  @ViewChild(ItemEditComponent)
  modal: ItemEditComponent = new ItemEditComponent;
  constructor(
    private fbs: FirebaseService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.fbs.getCollection('items');
    this.items$.subscribe(items => this.itemsCount = items.length);
  }

  add() {
    this.fbs.add('items', {desc: 'DESC' + (this.itemsCount + 1), date: new Date().toLocaleString()})
  }

  remove(item: Item) {
    this.fbs.remove('items', item.id);
  };

  edit(item: Item) {
    this.editItem = item;
    this.modal.open(item);
  }

  onApply(item: Item) {
    this.fbs.update('items', this.editItem, {desc: item.desc, date: item.date});
    this.modal.show = false;
  }

  onCancel(item: Item) {
    this.modal.show = false;
  }
}
