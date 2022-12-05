import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
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

  constructor(
    private shoppingListService: ShoppingListService,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.loggingService.printLog('Hello from shopping list component');
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChanged = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  // pass the index around and make it listenable
  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
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
