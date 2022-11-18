import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnChanges, OnDestroy {
  ingredients: Ingredient[];
  private igChanged: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChanged = this.shoppingListService.ingredientAdded.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.shoppingListService.ingredientAdded.subscribe(
    //   (ingredient: Ingredient) => this.ingredients.push(ingredient)
    // );
  }

  // addIngredient(ingredient: Ingredient) {
  //   console.log(ingredient);
  //   this.ingredients.push(ingredient);
  // }

  ngOnDestroy(): void {
    this.igChanged.unsubscribe();
  }
}
