// import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  // ingredientAdded = new EventEmitter<Ingredient[]>();
  ingredientAdded = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 6),
    new Ingredient('Tomatoes', 9),
  ];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // this.ingredientAdded.emit(this.ingredients.slice()); // emit the original array, to make sure we retrieve the original + the new ingredient inside..
    this.ingredientAdded.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
