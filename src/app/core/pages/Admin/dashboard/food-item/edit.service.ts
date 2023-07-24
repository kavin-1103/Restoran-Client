import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FoodItem } from './food-item-data';
import { environment } from 'environments/environment';
import { MessageService } from 'primeng/api';

const BASE_URL = `${environment.baseUrl}/FoodItem`;

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

const itemIndex = (item: FoodItem, data: FoodItem[]): number => {
  for (let idx = 0; idx < data.length; idx++) {
    if (data[idx].foodItemId === item.foodItemId) {
      return idx;
    }
  }

  return -1;
};

const cloneData = (data: FoodItem[]) => data.map((item) => Object.assign({}, item));

@Injectable()
export class EditService extends BehaviorSubject<FoodItem[]> {
  private data: FoodItem[] = [];
  private originalData: FoodItem[] = [];
  private createdItems: FoodItem[] = [];
  private updatedItems: FoodItem[] = [];
  private deletedItems: FoodItem[] = [];

  constructor(private http: HttpClient, private messageService : MessageService) {
    super([]);
  }

  public read(): void {
    if (this.data.length) {
      return super.next(this.data);
    }

    this.fetch().subscribe(
      (response) => {
        const data = response.data;
        this.data = data;
        this.originalData = cloneData(data);
        super.next(data);
      },
      (error) => {
        // Handle the error
        console.error('Error: Failed to fetch data', error);
      }
    );
  }

  public create(item: FoodItem): void {
    const createdItem: FoodItem = {
     // Set foodItemId to null for a new item
      categoryId: item.categoryId,
      itemName: item.itemName,
      description: item.description,
      price: item.price
    };

    this.createdItems.push(createdItem);
    this.data.unshift(createdItem);
    super.next(this.data);
  }

  
public update(item: FoodItem): void {
    if (!this.isNew(item)) {
      const index = itemIndex(item, this.updatedItems);
      if (index !== -1) {
        this.updatedItems.splice(index, 1, item);
      } else {
        this.updatedItems.push(item);
      }
    } else {
      const index = this.createdItems.indexOf(item);
      this.createdItems.splice(index, 1, item);
    }
  }

  

  public remove(item: FoodItem): void {
    let index = itemIndex(item, this.data);
    this.data.splice(index, 1);

    index = itemIndex(item, this.createdItems);
    if (index >= 0) {
      this.createdItems.splice(index, 1);
    } else {
      this.deletedItems.push(item);
    }

    index = itemIndex(item, this.updatedItems);
    if (index >= 0) {
      this.updatedItems.splice(index, 1);
    }

    super.next(this.data);
  }

  public isNew(item: FoodItem): boolean {
    return !item.foodItemId;
  }

  public hasChanges(): boolean {
    return Boolean(this.deletedItems.length || this.updatedItems.length || this.createdItems.length);
  }

  
  public saveChanges(): void {
    if (!this.hasChanges()) {
      return;
    }

    const completed = [];
    if (this.deletedItems.length) {
        completed.push(this.saveDeletedItems(this.deletedItems));
      }
      if (this.updatedItems.length) {
        const updateRequests: Observable<any>[] = [];
        for (const item of this.updatedItems) {
          const requestData = {
            categoryId: item.categoryId,
            itemName: item.itemName,
            description: item.description,
            price: item.price
          };
          updateRequests.push(this.saveUpdatedItems(item, requestData));
        }
        completed.push(forkJoin(updateRequests));
      }

    if (this.createdItems.length) {
      completed.push(this.saveCreatedItems()); // Call saveCreatedItems to save the created items
    }

    this.reset();

    zip(...completed).subscribe(() => this.read());
  }

  private saveCreatedItems(): Observable<any> {
    if (this.createdItems.length === 0) {
      return of(null);
    }

    return forkJoin(
        this.createdItems.map(item => {
          const requestData = {
            categoryId: item.categoryId,
            itemName: item.itemName,
            description: item.description,
            price:item.price,
          };
    
          return this.http.post<any>(BASE_URL, requestData).pipe(
            map(response => {
              // Update the foodItemId of the created item with the value from the response
              console.log(response);
              item.foodItemId = response.foodItemId;
              return response; // Returning the response for further processing if needed
            }),
            catchError(error => {
              // Handle the error here
              console.log(error);
              const errorMessage = error?.error?.message || 'An error occurred';
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
              // Continue the observable with an empty object to avoid halting forkJoin
              return of({});
            })
          );
        })
      );
  }

  private saveDeletedItems(items: FoodItem[]): Observable<any> {
    const completed : any= [];
    items.forEach((item) => {
      completed.push(this.http.delete<any>(`${BASE_URL}/${item.foodItemId}`).pipe(
        map((response) => {
          // Handle the response if needed
          return response;
        })
      ));
    });

    return forkJoin(completed);
  }
  private saveUpdatedItems(item: FoodItem, requestData: any): Observable<any> {
    const url = `${BASE_URL}/${item.foodItemId}`;
    return this.http.put(url, requestData);
  }
  



  public cancelChanges(): void {
    this.reset();

    this.data = this.originalData;
    this.originalData = cloneData(this.originalData);
    super.next(this.data);
  }

  public assignValues(target: object, source: object): void {
    Object.assign(target, source);
  }

  private reset() {
    this.data = [];
    this.deletedItems = [];
    this.updatedItems = [];
    this.createdItems = [];
  }

  private fetch(action = '', data?: FoodItem[]): Observable<any> {
    let url = BASE_URL;
    if (action === UPDATE_ACTION && data && data.length === 1 && data[0].foodItemId) {
      url += `/${data[0].foodItemId}`;
    } else if (action === REMOVE_ACTION && data && data.length === 1 && data[0].foodItemId) {
      url += `/${data[0].foodItemId}`;
    }

    if (action === CREATE_ACTION || action === UPDATE_ACTION || action === REMOVE_ACTION) {
      return this.http.post<any>(url, data).pipe(map((res) => res));
    } else {
      return this.http.get<any>(url).pipe(map((res) => res));
    }
  }
}

