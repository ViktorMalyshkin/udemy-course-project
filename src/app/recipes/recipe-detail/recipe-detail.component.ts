import {Component, OnInit} from '@angular/core'
import {RecipeModel} from '../recipe.model'
import {ActivatedRoute, Router} from "@angular/router";
import * as fromApp from '../../store/app.reducer'
import {Store} from "@ngrx/store";
import {map, switchMap} from "rxjs/operators";
import * as RecipesActions from '../store/recipe.actions'
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.action'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: RecipeModel
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id']
    this.route.params
      .pipe(
        map(params => {
          return +params['id']
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes')
        }),
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id
          })
        })
      ).subscribe(recipe => {
      this.recipe = recipe
    })
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients))
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id)
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id))
    this.router.navigate(['/recipes'])
  }
}
