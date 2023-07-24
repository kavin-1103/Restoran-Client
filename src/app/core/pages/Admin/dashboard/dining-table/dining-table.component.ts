


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

import { DiningTable } from './dining-table';
import { DiningService } from "./dining-table-edit.service";
import { map } from "rxjs/operators";



@Component({
  selector: 'app-dining-table',
  templateUrl: './dining-table.component.html',
  styleUrls: ['./dining-table.component.scss'],
  providers: [DiningService],
})
export class DiningTableComponent implements OnInit{
  public view?: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };

  public changes = {};

  constructor(
    private formBuilder: FormBuilder,
    public diningService: DiningService
  ) {}

  public ngOnInit(): void {
    this.view = this.diningService.pipe(
      map((data) => process(data, this.gridState))
    );

    this.diningService.read();
  }
  public onStateChange(state: State): void {
    this.gridState = state;

    this.diningService.read();
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

      this.diningService.assignValues(dataItem, formGroup.value);
      this.diningService.update(dataItem);
    }
  }

  public addHandler(args: AddEvent): void {
    args.sender.addRow(this.createFormGroup(new DiningTable()));
  }

  public cancelHandler(args: CancelEvent): void {
    args.sender.closeRow(args.rowIndex);
  }
  public saveHandler(args: SaveEvent): void {
    if (args.formGroup.valid) {
      this.diningService.create(args.formGroup.value);
      args.sender.closeRow(args.rowIndex);
    }
  }

  public removeHandler(args: RemoveEvent): void {
    this.diningService.remove(args.dataItem);

    args.sender.cancelCell();
  }
  public saveChanges(grid: GridComponent): void {
    grid.closeCell();
    grid.cancelCell();

    this.diningService.saveChanges();
  }

  public cancelChanges(grid: GridComponent): void {
    grid.cancelCell();

    this.diningService.cancelChanges();
  }
  
  public createFormGroup(dataItem: DiningTable): FormGroup {
    return this.formBuilder.group({
      tableId: dataItem.tableId,
      tableNumber: [dataItem.tableNumber, Validators.required],
      
      capacity: dataItem.capacity,
      
    });
  }

}


