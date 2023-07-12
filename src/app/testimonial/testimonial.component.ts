
import { Component, AfterViewInit,OnInit } from '@angular/core';
import { PrimeNGConfig } from "primeng/api";
import { HttpClient } from '@angular/common/http';
declare var $: any;



// interface Testimonial {
//   name: string;
//   profession: string;
//   review: string;
// }

// @Component({
//   selector: 'app-testimonial',
//   templateUrl: './testimonial.component.html',
//   styleUrls: ['./testimonial.component.scss']
// })
// export class TestimonialComponent  {
//   carouselItems = [
//     { src: "../../assets/img/menu-1.jpg", alt: "Image 1" },
//     { src: "../../assets/img/menu-2.jpg", alt: "Image 2" },
//     { src: "../../assets/img/menu-3.jpg", alt: "Image 3" }
//   ];

//   testimonials: Testimonial[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     // Make an HTTP request to fetch testimonial data from the API
//     this.http.get<Testimonial[]>('API_ENDPOINT_URL').subscribe(
//       (response) => {
//         this.testimonials = response;
//       },
//       (error) => {
//         console.error('Failed to fetch testimonials:', error);
//       }
//     );
//   }
// }

export interface Tutorial {
  title?: string;
  image?: string;
}

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
  carouselItems = [
    { src: "../../assets/img/menu-1.jpg", alt: "Image 1" },
    { src: "../../assets/img/menu-2.jpg", alt: "Image 2" },
    { src: "../../assets/img/menu-3.jpg", alt: "Image 3" }
  ];

  tutorials: Tutorial[]=[];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.tutorials = [
      {
        title: "Web MH",
        image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210420155051/WebMH.png"
      },
      {
        title: "Interview Experience",
        image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210420112859/IntExp.png"
      },
      {
        title: "GeeksforGeeks Logo",
        image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210419113249/gfg-new-logo-min.png"
      },
      {
        title: "GeeksforGeeks Carnival",
        image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210418122505/132_00_00_Mailheader-min.png"
      },
      {
        title: "Python Course",
        image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20211028203138/GeeksforGeeks-Python-Foundation-Course-Learn-Python-from-Scratch-in-Hindi.png"
      }
    ];
  }
}




