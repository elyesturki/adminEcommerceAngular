import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { ResponseAPICat } from 'src/app/models/responseAPI';

@Component({
  selector: 'app-add-or-edit-product-modal',
  templateUrl: './add-or-edit-product-modal.component.html',
  styleUrls: ['./add-or-edit-product-modal.component.scss']
})
export class AddOrEditProductModalComponent implements OnInit, OnDestroy {

  @Input() product: Product | undefined ;
  @Input() pushParentSubject: Subject<any> | undefined;

  productModalOpen = false;
  categories: Category[] | any;
  categorySub : Subscription | undefined;

  productFrom: FormGroup | undefined;
  idCategory = 1;

  constructor(private formBuilder:FormBuilder, private categoriesService:CategoriesService) {
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
    // open modal event
    if (this.pushParentSubject) {
      this.pushParentSubject.subscribe(event => {
        this.productModalOpen = event;
        //changement des categories aprés l'ouverture du modal
        this.getCaregories();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.pushParentSubject) this.pushParentSubject.unsubscribe();
    if (this.categorySub) this.categorySub.unsubscribe();
  }

  getCaregories() {
    this.categorySub = this.categoriesService.getCategories().subscribe({
      next: (res: ResponseAPICat) => {
        this.categories = res.result;
      }
    })
  }

  selectCategory(idCategory: number) {
    this.idCategory = idCategory;
  }
}
