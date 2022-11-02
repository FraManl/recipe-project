import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Cassoulet aux fraises',
      'Une belle recette dégueulasse',
      'https://eadn-wc02-3894996.nxedge.io/wp-content/uploads/2018/01/pistachio-turmeric-rice-bowl6-1024x683.jpg'
    ),
    new Recipe(
      'Cordon bleu purée',
      'Le traditionnel cordon avec sa purée au beurre',
      'https://cdn.chefclub.tools/uploads/recipes/cover-thumbnail/41fd7230-01e0-4f35-aa96-2fb43894016c_a2dKvji.jpg'
    ),
  ];

  constructor() {}

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

  ngOnInit(): void {}
}
