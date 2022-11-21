import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe; //@ Input : get the recipe from outside (Output = push the recipe outside)
  // @Output() recipeSelected = new EventEmitter<void>();

  // Listen to the index input emitted by recipe list
  @Input() index: number;

  // constructor(private recipeService: RecipeService) {}

  // onSelected() {
  //   // this.recipeSelected.emit();
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }

  ngOnInit(): void {}
}
