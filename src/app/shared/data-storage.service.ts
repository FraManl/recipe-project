import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService
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
    // take(1) : we only take one value of the observable and then automatically unsubscribe
    // user is gotten only once here
    // also, we use exhaustmap() to chain observables, feeding one into the other, waiting for the first one to complete, then chain with the second before returning;(kind of overkill but its one way of doing it)
    // exhaust map will consume first obserable and return an other new observable afterwards
    // we do this to be able to extract the token of latest user..and be able to fetch data
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-project-c0d9f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
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
      );
    // return (
    //   this.http
    //     .get<Recipe[]>(
    //       'https://ng-recipe-project-c0d9f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    //     )
    //     // transform the object before subscribing
    //     .pipe(
    //       map((recipes) => {
    //         return recipes.map((recipe) => {
    //           return {
    //             ...recipe,
    //             ingredients: recipe.ingredients ? recipe.ingredients : [],
    //           };
    //         });
    //       }),
    //       tap((recipes) => {
    //         this.recipesService.setRecipe(recipes);
    //       })
    //     )
    //   // .subscribe((response) => {
    //   //   this.recipesService.setRecipe(response);
    //   // })
    // );
  }
}
