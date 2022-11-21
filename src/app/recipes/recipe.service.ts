import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // Manage our recipes
  // recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Cassoulet aux fraises',
      'Une belle recette dégueulasse',
      'https://eadn-wc02-3894996.nxedge.io/wp-content/uploads/2018/01/pistachio-turmeric-rice-bowl6-1024x683.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Fish', 3)]
    ),
    new Recipe(
      'Cordon bleu purée',
      'Le traditionnel cordon avec sa purée au beurre',
      'https://cdn.chefclub.tools/uploads/recipes/cover-thumbnail/41fd7230-01e0-4f35-aa96-2fb43894016c_a2dKvji.jpg',
      [new Ingredient('Ravioli', 10), new Ingredient('Eggs', 2)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(); // return a new array, a copy, not the original array; we protect the original one
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientToSL(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
