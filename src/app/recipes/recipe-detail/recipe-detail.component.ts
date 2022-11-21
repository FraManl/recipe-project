import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // because on our app we display the list of recipes side by side with the selected recipe, we have 2 coexisting IDs.. conflict, so below is not the good approach here
    // const id = +this.route.snapshot.params['id'];

    // instead, subscripe to the url
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  sendIngredients() {
    this.recipeService.addIngredientToSL(this.recipe.ingredients);
  }

  onEditRecipe() {
    // this works; but unproper.. and not self-explanatory.. why can we even navigate to edit/:id without even passing the id?...
    // this.router.navigate(['edit'], { relativeTo: this.route });
    // instead, build the complex relative path from scratch, clearer...
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
