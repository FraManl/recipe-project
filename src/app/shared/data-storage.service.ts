import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService
  ) {}

  storeRecipe() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(
        'https://ng-recipe-project-c0d9f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipe() {
    return (
      this.http
        .get<Recipe[]>(
          'https://ng-recipe-project-c0d9f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        )
        // transform the object before subscribing
        .pipe(
          map((recipes) => {
            return recipes.map((recipe) => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : [],
              };
            });
          }),
          tap((recipes) => {
            this.recipesService.setRecipe(recipes);
          })
        )
      // .subscribe((response) => {
      //   this.recipesService.setRecipe(response);
      // })
    );
  }
}
