// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, zip } from 'rxjs';

// import { map } from 'rxjs/operators';
// import { FoodItem } from './food-item-data';

// const CREATE_ACTION = 'create';
// const UPDATE_ACTION = 'update';
// const REMOVE_ACTION = 'destroy';

// const itemIndex = (item: FoodItem, data: FoodItem[]): number => {
//     for (let idx = 0; idx < data.length; idx++) {
//         if (data[idx].foodItemId === item.foodItemId) {
//             return idx;
//         }
//     }

//     return -1;
// };

// const cloneData = (data: FoodItem[]) => data.map(item => Object.assign({}, item));

// @Injectable()
// export class EditService extends BehaviorSubject<unknown[]> {
//     private data: FoodItem[] = [];
//     private originalData: FoodItem[] = [];
//     private createdItems: FoodItem[] = [];
//     private updatedItems:  FoodItem[] = [];
//     private deletedItems: FoodItem[] = [];

//     constructor(private http: HttpClient) {
//         super([]);
//     }

//     public read(): void {
//         if (this.data.length) {
//             return super.next(this.data);
//         }

//         this.fetch()
//             .subscribe(data => {
//                 this.data = data;
//                 this.originalData = cloneData(data);
//                 super.next(data);
//             });
//     }

//     public create(item: FoodItem): void {
//         this.createdItems.push(item);
//         this.data.unshift(item);

//         super.next(this.data);
//     }

//     public update(item: FoodItem): void {
//         if (!this.isNew(item)) {
//             const index = itemIndex(item, this.updatedItems);
//             if (index !== -1) {
//                 this.updatedItems.splice(index, 1, item);
//             } else {
//                 this.updatedItems.push(item);
//             }
//         } else {
//             const index = this.createdItems.indexOf(item);
//             this.createdItems.splice(index, 1, item);
//         }
//     }

//     public remove(item: FoodItem): void {
//         let index = itemIndex(item, this.data);
//         this.data.splice(index, 1);

//         index = itemIndex(item, this.createdItems);
//         if (index >= 0) {
//             this.createdItems.splice(index, 1);
//         } else {
//             this.deletedItems.push(item);
//         }

//         index = itemIndex(item, this.updatedItems);
//         if (index >= 0) {
//             this.updatedItems.splice(index, 1);
//         }

//         super.next(this.data);
//     }

//     public isNew(item: FoodItem): boolean {
//         return !item.foodItemId;
//     }

//     public hasChanges(): boolean {
//         return Boolean(this.deletedItems.length || this.updatedItems.length || this.createdItems.length);
//     }

//     public saveChanges(): void {
//         if (!this.hasChanges()) {
//             return;
//         }

//         const completed = [];
//         if (this.deletedItems.length) {
//             completed.push(this.fetch(REMOVE_ACTION, this.deletedItems));
//         }

//         if (this.updatedItems.length) {
//             completed.push(this.fetch(UPDATE_ACTION, this.updatedItems));
//         }

//         if (this.createdItems.length) {
//             completed.push(this.fetch(CREATE_ACTION, this.createdItems));
//         }

//         this.reset();

//         zip(...completed).subscribe(() => this.read());
//     }

//     public cancelChanges(): void {
//         this.reset();

//         this.data = this.originalData;
//         this.originalData = cloneData(this.originalData);
//         super.next(this.data);
//     }

//     public assignValues(target: object, source: object): void {
//         Object.assign(target, source);
//     }

//     private reset() {
//         this.data = [];
//         this.deletedItems = [];
//         this.updatedItems = [];
//         this.createdItems = [];
//     }

//     private fetch(action = '', data?: FoodItem[]): Observable<FoodItem[]> {
//         return this.http
//             .jsonp(`https://demos.telerik.com/kendo-ui/service/Products/${action}?${this.serializeModels(data)}`, 'callback')
//             .pipe(map(res => <FoodItem[]>res));
//     }

//     private serializeModels(data?: FoodItem[]): string {
//         return data ? `&models=${JSON.stringify(data)}` : '';
//     }
// }


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, zip } from 'rxjs';

// import { map } from 'rxjs/operators';
// import { FoodItem } from './food-item-data';

// const BASE_URL = 'https://localhost:7135/api/FoodItemsControllerAdmin';

// const CREATE_ACTION = 'create';
// const UPDATE_ACTION = 'update';
// const REMOVE_ACTION = 'destroy';

// const itemIndex = (item: FoodItem, data: FoodItem[]): number => {
//   for (let idx = 0; idx < data.length; idx++) {
//     if (data[idx].foodItemId === item.foodItemId) {
//       return idx;
//     }
//   }

//   return -1;
// };

// const cloneData = (data: FoodItem[]) => data.map((item) => Object.assign({}, item));

// @Injectable()
// export class EditService extends BehaviorSubject<FoodItem[]> {
//   private data: FoodItem[] = [];
//   private originalData: FoodItem[] = [];
//   private createdItems: FoodItem[] = [];
//   private updatedItems: FoodItem[] = [];
//   private deletedItems: FoodItem[] = [];

//   constructor(private http: HttpClient) {
//     super([]);
//   }

//   public read(): void {
//     if (this.data.length) {
//       return super.next(this.data);
//     }

//     this.fetch().subscribe((data) => {
//       this.data = data;
//       this.originalData = cloneData(data);
//       super.next(data);
//     });
//   }

//   public create(item: FoodItem): void {
//     this.createdItems.push(item);
//     this.data.unshift(item);

//     super.next(this.data);
//   }

//   public update(item: FoodItem): void {
//     if (!this.isNew(item)) {
//       const index = itemIndex(item, this.updatedItems);
//       if (index !== -1) {
//         this.updatedItems.splice(index, 1, item);
//       } else {
//         this.updatedItems.push(item);
//       }
//     } else {
//       const index = this.createdItems.indexOf(item);
//       this.createdItems.splice(index, 1, item);
//     }
//   }

//   public remove(item: FoodItem): void {
//     let index = itemIndex(item, this.data);
//     this.data.splice(index, 1);

//     index = itemIndex(item, this.createdItems);
//     if (index >= 0) {
//       this.createdItems.splice(index, 1);
//     } else {
//       this.deletedItems.push(item);
//     }

//     index = itemIndex(item, this.updatedItems);
//     if (index >= 0) {
//       this.updatedItems.splice(index, 1);
//     }

//     super.next(this.data);
//   }

//   public isNew(item: FoodItem): boolean {
//     return !item.foodItemId;
//   }

//   public hasChanges(): boolean {
//     return Boolean(this.deletedItems.length || this.updatedItems.length || this.createdItems.length);
//   }

//   public saveChanges(): void {
//     if (!this.hasChanges()) {
//       return;
//     }

//     const completed = [];
//     if (this.deletedItems.length) {
//       completed.push(this.fetch(REMOVE_ACTION, this.deletedItems));
//     }

//     if (this.updatedItems.length) {
//       completed.push(this.fetch(UPDATE_ACTION, this.updatedItems));
//     }

//     if (this.createdItems.length) {
//       completed.push(this.fetch(CREATE_ACTION, this.createdItems));
//     }

//     this.reset();

//     zip(...completed).subscribe(() => this.read());
//   }

//   public cancelChanges(): void {
//     this.reset();

//     this.data = this.originalData;
//     this.originalData = cloneData(this.originalData);
//     super.next(this.data);
//   }

//   public assignValues(target: object, source: object): void {
//     Object.assign(target, source);
//   }

//   private reset() {
//     this.data = [];
//     this.deletedItems = [];
//     this.updatedItems = [];
//     this.createdItems = [];
//   }

//   private fetch(action = '', data?: FoodItem[]): Observable<FoodItem[]> {
//     let url = BASE_URL;
//     if (action === UPDATE_ACTION && data && data.length === 1 && data[0].foodItemId) {
//       url += `/${data[0].foodItemId}`;
//     } else if (action === REMOVE_ACTION && data && data.length === 1 && data[0].foodItemId) {
//       url += `/${data[0].foodItemId}`;
//     }

//     if (action === CREATE_ACTION || action === UPDATE_ACTION || action === REMOVE_ACTION) {
//       return this.http.post<FoodItem[]>(url, data).pipe(map((res) => res));
//     } else {
//       return this.http.get<FoodItem[]>(url).pipe(map((res) => res));
//     }
//   }
// }
// -- correct result
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, zip } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { FoodItem } from './food-item-data';

// const BASE_URL = 'https://localhost:7135/api/FoodItemsControllerAdmin';

// const CREATE_ACTION = 'create';
// const UPDATE_ACTION = 'update';
// const REMOVE_ACTION = 'destroy';

// const itemIndex = (item: FoodItem, data: FoodItem[]): number => {
//   for (let idx = 0; idx < data.length; idx++) {
//     if (data[idx].foodItemId === item.foodItemId) {
//       return idx;
//     }
//   }

//   return -1;
// };

// const cloneData = (data: FoodItem[]) => data.map((item) => Object.assign({}, item));

// @Injectable()
// export class EditService extends BehaviorSubject<FoodItem[]> {
//   private data: FoodItem[] = [];
//   private originalData: FoodItem[] = [];
//   private createdItems: FoodItem[] = [];
//   private updatedItems: FoodItem[] = [];
//   private deletedItems: FoodItem[] = [];

//   constructor(private http: HttpClient) {
//     super([]);
//   }

//   public read(): void {
//     if (this.data.length) {
//       return super.next(this.data);
//     }

//     this.fetch().subscribe(
//       (response) => {
//         const data = response.data;
//         this.data = data;
//         this.originalData = cloneData(data);
//         super.next(data);
//       },
//       (error) => {
//         // Handle the error
//         console.error('Error: Failed to fetch data', error);
//       }
//     );
//   }

//   public create(item: FoodItem): void {
//     this.createdItems.push(item);
//     this.data.unshift(item);

//     super.next(this.data);
//   }

//   public update(item: FoodItem): void {
//     if (!this.isNew(item)) {
//       const index = itemIndex(item, this.updatedItems);
//       if (index !== -1) {
//         this.updatedItems.splice(index, 1, item);
//       } else {
//         this.updatedItems.push(item);
//       }
//     } else {
//       const index = this.createdItems.indexOf(item);
//       this.createdItems.splice(index, 1, item);
//     }
//   }

//   public remove(item: FoodItem): void {
//     let index = itemIndex(item, this.data);
//     this.data.splice(index, 1);

//     index = itemIndex(item, this.createdItems);
//     if (index >= 0) {
//       this.createdItems.splice(index, 1);
//     } else {
//       this.deletedItems.push(item);
//     }

//     index = itemIndex(item, this.updatedItems);
//     if (index >= 0) {
//       this.updatedItems.splice(index, 1);
//     }

//     super.next(this.data);
//   }

//   public isNew(item: FoodItem): boolean {
//     return !item.foodItemId;
//   }

//   public hasChanges(): boolean {
//     return Boolean(this.deletedItems.length || this.updatedItems.length || this.createdItems.length);
//   }

//   public saveChanges(): void {
//     if (!this.hasChanges()) {
//       return;
//     }

//     const completed = [];
//     if (this.deletedItems.length) {
//       completed.push(this.fetch(REMOVE_ACTION, this.deletedItems));
//     }

//     if (this.updatedItems.length) {
//       completed.push(this.fetch(UPDATE_ACTION, this.updatedItems));
//     }

//     if (this.createdItems.length) {
//       completed.push(this.fetch(CREATE_ACTION, this.createdItems));
//     }

//     this.reset();

//     zip(...completed).subscribe(() => this.read());
//   }

//   public cancelChanges(): void {
//     this.reset();

//     this.data = this.originalData;
//     this.originalData = cloneData(this.originalData);
//     super.next(this.data);
//   }

//   public assignValues(target: object, source: object): void {
//     Object.assign(target, source);
//   }

//   private reset() {
//     this.data = [];
//     this.deletedItems = [];
//     this.updatedItems = [];
//     this.createdItems = [];
//   }

//   private fetch(action = '', data?: FoodItem[]): Observable<any> {
//     let url = BASE_URL;
//     if (action === UPDATE_ACTION && data && data.length === 1 && data[0].foodItemId) {
//       url += `/${data[0].foodItemId}`;
//     } else if (action === REMOVE_ACTION && data && data.length === 1 && data[0].foodItemId) {
//       url += `/${data[0].foodItemId}`;
//     }

//     if (action === CREATE_ACTION || action === UPDATE_ACTION || action === REMOVE_ACTION) {
//       return this.http.post<any>(url, data).pipe(map((res) => res));
//     } else {
//       return this.http.get<any>(url).pipe(map((res) => res));
//     }
//   }

  
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { FoodItem } from './food-item-data';

const BASE_URL = 'https://localhost:7135/api/FoodItemsControllerAdmin';

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

  constructor(private http: HttpClient) {
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
    const requestData = {
      categoryId: item.categoryId,
      itemName: item.itemName,
      description: item.description,
      price: item.price
    };

    this.http.post<any>(BASE_URL, requestData).subscribe(
      (response) => {
        const createdItem: FoodItem = {
          foodItemId: response.foodItemId,
          categoryId: item.categoryId,
          itemName: item.itemName,
          description: item.description,
          price: item.price
        };

        this.createdItems.push(createdItem);
        this.data.unshift(createdItem);
        super.next(this.data);
      },
      (error) => {
        // Handle the error
        console.error('Error: Failed to create a new food item', error);
      }
    );
  }

  public update(item: FoodItem): void {
    if (!this.isNew(item)) {
      const requestData = {
        categoryId: item.categoryId,
        itemName: item.itemName,
        description: item.description,
        price: item.price
      };
  
      this.http.put<any>(`${BASE_URL}/${item.foodItemId}`, requestData).subscribe(
        (response) => {
          const updatedItem: FoodItem = {
            foodItemId: item.foodItemId,
            categoryId: item.categoryId,
            itemName: item.itemName,
            description: item.description,
            price: item.price
          };
  
          const index = itemIndex(item, this.updatedItems);
          if (index !== -1) {
            this.updatedItems.splice(index, 1, updatedItem);
          } else {
            this.updatedItems.push(updatedItem);
          }
  
          super.next(this.data);
        },
        (error) => {
          // Handle the error
          console.error('Error: Failed to update the food item', error);
        }
      );
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
      completed.push(this.fetch(REMOVE_ACTION, this.deletedItems));
    }
  
    if (this.updatedItems.length) {
      completed.push(this.fetch(UPDATE_ACTION, this.updatedItems));
    }
  
    if (this.createdItems.length) {
      completed.push(
        ...this.createdItems.map((item) =>
          this.createAndFetch(item)
        )
      );
    }
  
    this.reset();
  
    zip(...completed).subscribe(() => this.read());
  }
  
  private createAndFetch(item: FoodItem): Observable<any> {
    const requestData = {
      categoryId: item.categoryId,
      itemName: item.itemName,
      description: item.description,
      price: item.price
    };
  
    return this.http.post<any>(BASE_URL, requestData).pipe(
      map((response) => {
        const createdItem: FoodItem = {
          foodItemId: response.foodItemId,
          categoryId: item.categoryId,
          itemName: item.itemName,
          description: item.description,
          price: item.price
        };
  
        this.createdItems.push(createdItem);
        this.data.unshift(createdItem);
        super.next(this.data);
  
        return response; // Returning the response for further processing if needed
      })
    );
  }
  
//   public saveChanges(): void {
//     if (!this.hasChanges()) {
//       return;
//     }

//     const completed = [];
//     if (this.deletedItems.length) {
//       completed.push(this.fetch(REMOVE_ACTION, this.deletedItems));
//     }

//     if (this.updatedItems.length) {
//       completed.push(this.fetch(UPDATE_ACTION, this.updatedItems));
//     }

//     if (this.createdItems.length) {
//       completed.push(this.fetch(CREATE_ACTION, this.createdItems));
//     }

//     this.reset();

//     zip(...completed).subscribe(() => this.read());
//   }

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
