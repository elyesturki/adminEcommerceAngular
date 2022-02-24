import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  parentSubject:Subject<boolean> = new Subject();

  @Input() products: Product[];

  productModalOpen: boolean = false;
  selectedProduct: Product;


  constructor() { }

  ngOnInit(): void {
    this.productModalOpen = false;
    this.parentSubject.next(this.productModalOpen);
  }

  onEdit( product: Product) : void {
    this.productModalOpen = true;
    this.parentSubject.next(this.productModalOpen);

    this.selectedProduct = product;
    console.log(this.selectedProduct);
  }

  onDelete(product: Product) : void {

  }

  onAdd() : void {
    this.productModalOpen = true;
    this.parentSubject.next(this.productModalOpen);
    this.selectedProduct = null;
  }

  handleFinish(recivedProduct: Product) {
    console.log('added product: ', recivedProduct);
    if(this.selectedProduct) {
      console.log('edit Product');
    } else {
      console.log('add Product');
    }
    this.productModalOpen = false;
    this.parentSubject.next(this.productModalOpen);
  }

}
