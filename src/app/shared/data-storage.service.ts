import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../services/recipe.service";
import {RecipeModel} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes()
    return this.http.put('https://udemy-course-recipe-book-4a524-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
      response => {
        console.log(response)
      }
    )
  }

  fetchRecipes() {
    return this.http.get<RecipeModel[]>('https://udemy-course-recipe-book-4a524-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes)
        })
      )
  }

}
