import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnChanges {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientAdded.subscribe(
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
}
