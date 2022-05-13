import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthUserDTO} from "../../../../shared/dto/user.dto";
import {getInputErrorClasses} from "../../../../shared/utils/get-input-error-classes";
import {CategoryDTO} from "../../../../shared/dto/category.dto";
import {ProductDTO} from "../../../../shared/dto/product.dto";
import {NutrientsType, QUANTITY_SELECTION, SelectedProductDTO} from "../../../../shared/dto/selected-product.dto";

@Component({
  selector: 'calorie-app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @Input('user') user: AuthUserDTO;
  @Input('categories') categories: CategoryDTO[];
  @Input('products') products: ProductDTO[];
  @Output() submitFormEvent = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  addProductForm: FormGroup;
  selectedProduct: SelectedProductDTO;
  selectedProducts: SelectedProductDTO[] = [];
  measurements: Array<Record<string, string>> = [{text: '100g', value: 'gram'}, {text: '1vnt (porcija)', value: 'unit'}]
  term: string;
  totals: any = {
    grams: 0,
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0
  };

  ngOnInit(): void {
    this.createAddProductForm();
    this.subscribeToIsMealValueChanges();
  }

  get measurement() {
    return this.addProductForm.get('measurement');
  }

  get isMeal() {
    return this.addProductForm.get('isMeal');
  }

  getErrorClasses(field: string): Record<string, boolean> {
    return getInputErrorClasses(field, this.addProductForm);
  }

  productChange(term: string): void {
    this.selectedProduct = this.getSelectedProductByName(term);
    if (this.selectedProduct) {
      this.selectedProducts.push(this.selectedProduct);
      this.calculateProductTotals();
      this.term = "";
    }
  }

  productQuantityChange(selectedProduct: SelectedProductDTO): void {
    const product = this.products.find(product => product._id === selectedProduct.productId);
    switch (selectedProduct.quantity.selected) {
      case QUANTITY_SELECTION.GRAM:
        this.calculateNutrients(QUANTITY_SELECTION.GRAM, product, selectedProduct);
        break;
      case QUANTITY_SELECTION.UNIT:
        this.calculateNutrients(QUANTITY_SELECTION.UNIT, product, selectedProduct);
        break;
    }
    this.calculateProductTotals();
  }

  calculateProductTotals(): void {
    this.totals = {grams: 0,calories: 0, proteins: 0, carbs: 0, fats: 0};
    this.selectedProducts.forEach((product: SelectedProductDTO) => {
      this.totals.grams += product.quantity.grams;
      this.totals.calories += product.nutrients.calories;
      this.totals.proteins += product.nutrients.proteins;
      this.totals.carbs += product.nutrients.carbs;
      this.totals.fats += product.nutrients.fats;
    })

    this.addProductForm.get('calories').setValue(this.totals.calories);
    this.addProductForm.get('proteins').setValue(this.totals.proteins);
    this.addProductForm.get('carbs').setValue(this.totals.carbs);
    this.addProductForm.get('fats').setValue(this.totals.fats);
    this.addProductForm.get('mealPortionSize').setValidators([Validators.required, Validators.pattern(/(,*[\d]+,*[\d]*)+/), Validators.min(100), Validators.max(this.totals.grams)]);
  }

  calculateNutrients(measurement: string, product: ProductDTO, selectedProduct: SelectedProductDTO): void {
    if (measurement === QUANTITY_SELECTION.GRAM) {
      for (const nutrient in selectedProduct.nutrients) {
        selectedProduct.nutrients[nutrient as keyof NutrientsType] = Number((product.nutrients[nutrient as keyof NutrientsType] * (selectedProduct.quantity.grams / 100)).toFixed(2));
      }
    } else {
      for (const nutrient in selectedProduct.nutrients) {
        selectedProduct.nutrients[nutrient as keyof NutrientsType] = Number((product.nutrients[nutrient as keyof NutrientsType] * (selectedProduct.quantity.units * product.quantities.unit_g / 100)).toFixed(2));
      }
    }
  }

  removeItem(index: number): void {
    this.selectedProducts.splice(index, 1);
    this.calculateProductTotals();
  }

  submitForm(): void {
    this.submitFormEvent.emit({...this.addProductForm.getRawValue(), totals: this.totals, ingredients: this.selectedProducts});
  }

  private getSelectedProductByName(selectedName: string): SelectedProductDTO | null{
    const product = this.products.find(product => product.name.includes(selectedName));
    if(product){
      return {
        productId: product._id,
        productName: product.name,
        nutrients: {
          ...product.nutrients
        },
        quantity: {
          hasUnits: !!product.quantities.unit_g,
          selected: QUANTITY_SELECTION.GRAM,
          grams: product.quantities.quantity_g,
          units: product.quantities.unit_g ? 1 : null
        }
      }
    }
    return null;
  }

  private createAddProductForm(): void {
    this.addProductForm = this.fb.group({
      name: [null, [Validators.required]],
      category: [null, [Validators.required]],
      measurement: ['gram', [Validators.required]],
      measurementByUnit: [0, [Validators.required, Validators.pattern(/(,*[\d]+,*[\d]*)+/)]],
      isMeal: [false, [Validators.required]],
      mealPortionSize: [0, [Validators.required, Validators.pattern(/(,*[\d]+,*[\d]*)+/)]],
      calories: [null, [Validators.required, Validators.pattern(/(,*[\d]+,*[\d]*)+/)]],
      proteins: [null, [Validators.required, Validators.pattern(/(,*[\d]+,*[\d]*)+/)]],
      carbs: [null, [Validators.required, Validators.pattern(/(,*[\d]+,*[\d]*)+/)]],
      fats: [null, [Validators.required, Validators.pattern(/(,*[\d]+,*[\d]*)+/)]],
    })
  }

  private subscribeToIsMealValueChanges(): void {
    this.addProductForm.get('isMeal').valueChanges.subscribe(value => {
      if (value === false) {
        this.selectedProducts = [];

        this.addProductForm.get('calories').enable();
        this.addProductForm.get('proteins').enable();
        this.addProductForm.get('carbs').enable();
        this.addProductForm.get('fats').enable();
      } else{
        this.addProductForm.get('calories').disable();
        this.addProductForm.get('proteins').disable();
        this.addProductForm.get('carbs').disable();
        this.addProductForm.get('fats').disable();
      }
    })
  }

}
