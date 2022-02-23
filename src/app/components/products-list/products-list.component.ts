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

  @Input() products: Product[] | any;

  productModalOpen: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.productModalOpen = false;
    this.parentSubject.next(this.productModalOpen);
  }

  onEdit( product: Product) : void {
    this.productModalOpen = true;
    this.parentSubject.next(this.productModalOpen);
  }

  onDelete(product: Product) : void {

  }

  onAdd() : void {
    this.productModalOpen = true;
    this.parentSubject.next(this.productModalOpen);
  }

}
