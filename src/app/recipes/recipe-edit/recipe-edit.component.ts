import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute) {}

  // angular natively clean up subscription after use (especially native observables such as Params), but always a good practice to unsubscribe custom observables explicitely in the code (thing we don't do here...); otherwise angular won't do it... cause not managed by angular
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // does it have the id ?
      this.editMode = params['id'] != null;
    });
  }
}
