import {Injectable} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<IngredientModel[]>()
  startedEditing = new Subject<number>()
  private ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10),
  ]


  constructor() {
  }

  getIngredients(): IngredientModel[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index]
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: IngredientModel[]) {
    // for (let ingredient of ingredients){
    //   this.addIngredient(ingredient)
    // }
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  updateIngredient(index: number, newIngredient) {
    this.ingredients[index] = newIngredient
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
