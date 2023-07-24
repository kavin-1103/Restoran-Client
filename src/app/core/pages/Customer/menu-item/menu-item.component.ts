import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'app/core/services/CustomerService/customer.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { LocationStrategy } from '@angular/common';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}


@Component({
  selector: 'app-menuItem',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  providers:[MessageService, ConfirmationService]
})

export class MenuItemComponent implements OnInit {
  menuItems: MenuItem[] = [];
  categories: Categories[] = [];
  selectedCategory: any = 'All';
  searchTerm: string = '';
  cartItems: MenuItem[] = [];
  tableId !: number;
  reservationId! : number;

  paginatedMenuItems: MenuItem[] = [];

  currentPage: number = 1;
  totalPages: number = 0;
  // Define the form group
  menuForm!: FormGroup;

  first: number = 0;
  rows: number = 9 ;

    // Method to handle pagination changes and update the paginatedMenuItems array
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.currentPage = event.page + 1;
    this.paginateMenuItems();
  }


  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route : ActivatedRoute,
    private router : Router,
    private messageService : MessageService,
    private confirmationService : ConfirmationService,
    private locationStrategy: LocationStrategy

  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getFoodItems();
    this.initForm();

    
    this.route.queryParams.subscribe((params)=>{
      this.tableId = +params['table_id'];
      this.reservationId = +params['reservation_id'];
    })
    
    this.currentPage = 1; // Set default value for currentPage
    this.rows = 9; // Set default value for rows (number of items to display per page)
    this.paginateMenuItems();
    this.preventBackButton();
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload($event: any) {
    
      this.confirmExit();
      $event.preventDefault(); // Prevent the default behavior of the back button
       // Show confirmation dialog
    }

    preventBackButton() {
      history.pushState(null,  location.href);
      this.locationStrategy.onPopState(() => {
        this.confirmExit();
        history.pushState(null,  location.href);

})
}

paginateMenuItems(): void {
  const startIndex = (this.currentPage - 1) * this.rows; // Start index for the current page
  const endIndex = startIndex + this.rows; // End index (show 'rows' items per page)
  
  this.paginatedMenuItems = this.menuItems.slice(startIndex, endIndex);
  this.totalPages = Math.ceil(this.menuItems.length / this.rows); /// Calculate total pages based on cartItems length
}


    
    
confirmExit() {
  this.confirmationService.confirm({
    message: 'Are you sure you want to leave this page?\n If you leave this page your reservation will be cancelled',
    accept: () => {
      // User confirmed, prevent the back button behavior
      this.cancelOrder();
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);
      history.pushState(null, location.href);
    },
    reject: () => {
      // User declined, allow the back button behavior
      this.locationStrategy.back();
    },
  });
}



  getCategories(): void {
    this.customerService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response.data.map((category: any) => ({
          categoryId: category.menuCategoryId,
          categoryName: category.categoryName
        }));
      },
      (error: any) => {
        console.error('Error Getting Categories: ', error);
      }
    );
  }

  getFoodItems(): void {
    this.customerService.getAllFoodItems().subscribe(
      (response: any) => {
        this.menuItems = response.data.map((item: any) => ({
          foodItemId: item.foodItemId,
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          itemName: item.itemName,
          description: item.description,
          quantity: 0,
        }));

        this.menuItems.forEach((menuItem) => {
          const cartItem = this.cartItems.find((item) => item.foodItemId === menuItem.foodItemId);
          if (cartItem) {
            menuItem.quantity = cartItem.quantity;
          }
        });
        this.paginateMenuItems();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // Initialize the form group and set up the form array for menu items
  initForm(): void {
    this.menuForm = this.fb.group({
      menuItems: this.fb.array([]) // This will be the form array for dynamic input fields
    });
    this.addMenuItemsToForm();
  }

  // Convenience getter to access the form array
  get menuItemsFormArray(): FormArray {
    return this.menuForm.get('menuItems') as FormArray;
  }

  // Method to add menu items to the form array
  addMenuItemsToForm(): void {
    this.menuItems.forEach((menuItem) => {
      this.addMenuItemToForm(menuItem);
    });
  }

  // Method to add a menu item to the form array
  addMenuItemToForm(menuItem: MenuItem): void {
    this.menuItemsFormArray.push(this.fb.group({
      foodItemId: menuItem.foodItemId,
      quantity: menuItem.quantity
    }));
  }

  // Method to remove a menu item from the form array
  removeMenuItemFromForm(index: number): void {
    this.menuItemsFormArray.removeAt(index);
  }

  // Method to handle quantity changes and update cartItems array
  onQuantityChange(index: number): void {
    const menuItemForm = this.menuItemsFormArray.at(index);
    const quantity = menuItemForm.get('quantity')?.value;
    const foodItemId = menuItemForm.get('foodItemId')?.value;

    if (quantity === 0) {
      // Remove the item from cartItems if its quantity becomes zero
      this.cartItems = this.cartItems.filter(item => item.foodItemId !== foodItemId);
    } else {
      // Add or update the item in cartItems if its quantity is greater than zero
      const existingCartItem = this.cartItems.find(item => item.foodItemId === foodItemId);
      if (existingCartItem) {
        existingCartItem.quantity = quantity;
      } else {
        const menuItem = this.menuItems.find(item => item.foodItemId === foodItemId);
        if (menuItem) {
          this.cartItems.push({
            foodItemId: menuItem.foodItemId,
            categoryId: menuItem.categoryId,
            categoryName: menuItem.categoryName,
            itemName: menuItem.itemName,
            description: menuItem.description,
            quantity: quantity
          });
        }
      }
    }
  }

  // Method to submit the form and place the order
  // ... (previously defined code)

filterMenu(category: any): void {
  this.selectedCategory = category.categoryName;
  if (category === 'All') {
    this.getFoodItems();
  } else {
    this.getFoodItemById(category.categoryId);
  }
}

increaseQuantity(menuItem: MenuItem) {
  if (menuItem.quantity < 10) {
    menuItem.quantity++;
    this.updateCartItems(menuItem);
  }
}

decreaseQuantity(menuItem: MenuItem) {
  if (menuItem.quantity > 0) {
    menuItem.quantity--;
    this.updateCartItems(menuItem);
  }
}

updateCartItems(menuItem: MenuItem): void {
  if (menuItem.quantity === 0) {
    // Remove the item from cartItems if its quantity becomes zero
    this.cartItems = this.cartItems.filter((item) => item.foodItemId !== menuItem.foodItemId);
  } else {
    // Add or update the item in cartItems if its quantity is greater than zero
    const existingCartItem = this.cartItems.find((item) => item.foodItemId === menuItem.foodItemId);
    if (existingCartItem) {
      existingCartItem.quantity = menuItem.quantity;
    } else {
      this.cartItems.push(menuItem);
    }
  }
}

searchMenu(): void {
  if (this.searchTerm.trim() === '') {
    this.getFoodItems();
  } else {
    this.menuItems = this.menuItems.filter((item: MenuItem) =>
      item.itemName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

placeOrder(): void {
  this.cartItems = this.menuItems.filter((item: MenuItem) => item.quantity > 0);
  if (this.cartItems.length === 0) {
    console.log('No items selected for the order.');
    return;
  }

  const order: Order = {
    tableId: this.tableId,
    orderDate: new Date().toISOString(),
    orderItems: this.cartItems.map((item) => ({
      foodItemId: item.foodItemId,
      quantity: item.quantity,
    })),
  };

  console.log(order);
  // Assuming you have a method in your customerService to place the order
  this.customerService.placeOrder(order).subscribe(
    (response: any) => {
      console.log('Order placed successfully:', response);
      // Reset cartItems after successful order placement
      this.cartItems = [];
      this.messageService.add({
        severity: 'success',
        summary: 'Booking Status',
        detail: response.message,
      });


      setTimeout(() => { 
        this.router.navigate(['/home']);
      }, 2000);

    },
    (error: any) => {
      console.error('Error placing order:', error);
    }
  );
}

cancelOrder(): void {
  // Reset the cartItems to clear the current order
  this.cartItems = [];

  // Reset the quantities of menu items to 0
  this.menuItems.forEach((menuItem) => {
    menuItem.quantity = 0;
  });

  // Get the reservationId from the query parameters
  this.route.queryParams.subscribe(params => {
    const reservationId = +params['reservation_id'];

    // Call the deleteReservation method to cancel the reservation
    this.customerService.deleteReservation(reservationId).subscribe(
      (response: any) => {
        console.log('Reservation cancelled successfully:', response);
        // Navigate to the home page after successful cancellation
        this.messageService.add({
          severity: 'info',
          summary: 'Booking Status',
          detail: response.message,
        });
  
  
        setTimeout(() => { 
          this.router.navigate(['/home']);
        }, 2000);

      },
      (error: any) => {
        console.error('Error cancelling reservation:', error);
      }
    );
  });
}

getFoodItemById(categoryId: number): void {
  this.customerService.getFoodItemByCategory(categoryId).subscribe(
    (response: any) => {
      this.menuItems = response.data.map((item: any) => ({
        foodItemId: item.foodItemId,
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        itemName: item.itemName,
        description: item.description,
        quantity: 0,
      }));

      // Update the quantities from cartItems if available
      this.menuItems.forEach((menuItem) => {
        const cartItem = this.cartItems.find((item) => item.foodItemId === menuItem.foodItemId);
        if (cartItem) {
          menuItem.quantity = cartItem.quantity;
        }
      });
    },
    (error: any) => {
      console.error(error);
    }
  );
}

}

interface Categories {
  categoryId: number;
  categoryName: string;
}

interface MenuItem {
  foodItemId: number;
  categoryId: number;
  categoryName: string;
  itemName: string;
  description: string;
  quantity: number;
}


export interface Order {
  tableId : number ;
  orderDate: string;
  orderItems: { foodItemId: number; quantity: number }[];
}