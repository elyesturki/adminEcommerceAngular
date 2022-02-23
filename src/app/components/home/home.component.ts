import { Component, OnInit } from '@angular/core';
import { Subject, Subscriber, Subscription } from 'rxjs';
import { ResAPIProduct } from 'src/app/models/responseAPI';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  productSub = new Subscription;

  constructor( private productService: ProductsService) { }

  ngOnInit(): void {
    this.productSub = this.productService.getProducts().subscribe({
        next: (res: ResAPIProduct)=> {
          this.products = res.result;
        },
        error: (err) => {
          console.log('une erreure est produite: ', err);
        }

    })
  }

}
