import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientAdded = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 6),
    new Ingredient('Tomatoes', 9),
  ];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice()); // emit the original array, to make sure we retrieve the original + the new ingredient inside..
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
