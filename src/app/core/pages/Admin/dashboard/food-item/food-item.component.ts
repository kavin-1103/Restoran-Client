import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";

import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import {
  AddEvent,
  GridDataResult,
  CellClickEvent,
  CellCloseEvent,
  SaveEvent,
  CancelEvent,
  GridComponent,
  RemoveEvent,
} from "@progress/kendo-angular-grid";

import { State, process } from "@progress/kendo-data-query";

import { Keys } from "@progress/kendo-angular-common";

import { FoodItem } from './food-item-data';
import { EditService } from "./edit.service";
import { map } from "rxjs/operators";
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss'],
  providers : [MessageService]
})
export class FoodItemComponent implements OnInit{
  public view?: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };

  public changes = {};

  constructor(
    private formBuilder: FormBuilder,
    public editService: EditService
  ) {}

  public ngOnInit(): void {
    this.view = this.editService.pipe(
      map((data) => process(data, this.gridState))
    );

    this.editService.read();
  }
  public onStateChange(state: State): void {
    this.gridState = state;

    this.editService.read();
  }

  public cellClickHandler(args: CellClickEvent): void {
    if (!args.isEdited) {
      args.sender.editCell(
        args.rowIndex,
        args.columnIndex,
        this.createFormGroup(args.dataItem)
      );
    }
  }
  public cellCloseHandler(args: CellCloseEvent): void {
    const { formGroup, dataItem } = args;

    if (!formGroup.valid) {
      // prevent closing the edited cell if there are invalid values.
      args.preventDefault();
    } else if (formGroup.dirty) {
      if (args.originalEvent && args.originalEvent.keyCode === Keys.Escape) {
        return;
      }

      this.editService.assignValues(dataItem, formGroup.value);
      this.editService.update(dataItem);
    }
  }

  public addHandler(args: AddEvent): void {
    args.sender.addRow(this.createFormGroup(new FoodItem()));
  }

  public cancelHandler(args: CancelEvent): void {
    args.sender.closeRow(args.rowIndex);
  }
  public saveHandler(args: SaveEvent): void {
    if (args.formGroup.valid) {
      this.editService.create(args.formGroup.value);
      args.sender.closeRow(args.rowIndex);
    }
  }

  public removeHandler(args: RemoveEvent): void {
    this.editService.remove(args.dataItem);

    args.sender.cancelCell();
  }
  public saveChanges(grid: GridComponent): void {
    grid.closeCell();
    grid.cancelCell();

    this.editService.saveChanges();
  }

  public cancelChanges(grid: GridComponent): void {
    grid.cancelCell();

    this.editService.cancelChanges();
  }
  public createFormGroup(dataItem: FoodItem): FormGroup {
    return this.formBuilder.group({
      foodItemId: dataItem.foodItemId,
      categoryId: [dataItem.categoryId, Validators.required],
      description : [dataItem.description , Validators.required],
      itemName: [dataItem.itemName, Validators.required],
      price: dataItem.price,
      
    });
  }

}
