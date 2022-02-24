import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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

  @Input() product: Product;
  @Input() pushParentSubject: Subject<any>;
  @Output() finishForm = new EventEmitter();

  productModalOpen = false;
  categories: Category[];
  categorySub : Subscription;

  productFrom : FormGroup;
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
      this.pushParentSubject.subscribe(event => {
        this.productModalOpen = event;
        //changement des categories aprés l'ouverture du modal
        this.getCaregories();
      })
  }

  ngOnDestroy(): void {
    this.pushParentSubject.unsubscribe();
    this.categorySub.unsubscribe();
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

  get invalidProductInfos() : boolean {
    return this.productFrom.get('productInfos').invalid;
  }

  get invalidIllustration() : boolean {
    return this.productFrom.get('illustration').invalid;
  }

  close() {
    this.productFrom.reset();
    this.idCategory = 1;
  }

  handleCancel() {
    this.close();
    this.productModalOpen=false;
  }

  handleFinish() {
    const product = {
      ...this.productFrom.get('productInfos').value,
      ...this.productFrom.get('illustration').value,
      category: this.idCategory
    }
    this.close();
    this.finishForm.emit(
      // send this object to parent list
      product
    )
  }
}
