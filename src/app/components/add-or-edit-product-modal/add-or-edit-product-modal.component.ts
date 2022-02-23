import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-add-or-edit-product-modal',
  templateUrl: './add-or-edit-product-modal.component.html',
  styleUrls: ['./add-or-edit-product-modal.component.scss']
})
export class AddOrEditProductModalComponent implements OnInit {

  @Input() product: Product | undefined ;
  @Input() pushParentSubject: Subject<any> | undefined;

  productModalOpen = false;

  productFrom: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.productFrom = formBuilder.group({
      productInfos: formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        stock: ['', Validators.required],
      }),
      illustration: formBuilder.group({
        image: ['', Validators.required]
      })
    })
  }

  ngOnInit(): void {
    if (this.pushParentSubject) {
      this.pushParentSubject.subscribe(event => {
        this.productModalOpen = event;
        console.log(this.productModalOpen);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.pushParentSubject) this.pushParentSubject.unsubscribe();
  }

}
