import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {IngredientModel} from '../../shared/ingredient.model'
import {ShoppingListService} from "../../services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) shoppingListForm: NgForm
  subscription: Subscription
  editMode = false
  editedItemIndex: number
  editedItem: IngredientModel

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index
      this.editMode = true
      this.editedItem = this.shoppingListService.getIngredient(index)
      this.shoppingListForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  onAddItem(form: NgForm): void {
    const value = form.value
    const newIngredient = new IngredientModel(value.name, value.amount)
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient)
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
