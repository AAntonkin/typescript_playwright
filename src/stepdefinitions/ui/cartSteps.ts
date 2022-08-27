import { ICustomWorld } from "../../support/custom-world";
// import { config } from "../support/config";
import { When, Then, DataTable } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import {
  getCategoryId,
  getSubCategoryId,
  getProductId,
} from "../../objects/enums";
import { ProductPage } from "../../pageObects/productPage";
import { CartPage } from "../../pageObects/cartPage";
// import { CartTable } from '../objects/enums';

When(
  "User open product page:",
  async function (this: ICustomWorld, productToAdd: DataTable) {
    const page = this.page!;
    const productPage = new ProductPage(page);
    const product = productToAdd.hashes()[0];
    const categoryId = getCategoryId(product["Category"]);
    const subcategoryId = getSubCategoryId(product["SubCategory"]);
    const productId = getProductId(product["Product"]);
    productPage.openProductPage(categoryId, subcategoryId, productId);
    await expect(page).toHaveURL(/product_id=/);
    await expect(productPage.getFullName()).toHaveText(product["Product"]);
  }
);

When("Remember price", async function (this: ICustomWorld) {
  const page = this.page!;
  const productPage = new ProductPage(page);
  const price = await productPage.getPrice().textContent();
  this.scenarioContext?.set("Price", price?.toString().trim());
  this.log("Price: " + price);

  //=(productPage.getPrice());
});

When(
  "User adds {string} products to cart",
  async function (this: ICustomWorld, quantity: string) {
    const page = this.page!;
    const productPage = new ProductPage(page);

    const quantityTextField = await productPage.getQuantityTextField();
    await quantityTextField.dblclick();
    await quantityTextField.type(quantity);

    this.scenarioContext?.set("Quantity", quantity);
    await productPage.getCartButton().click();
  }
);

Then("User verify product in cart", async function (this: ICustomWorld) {
  const page = this.page!;
  let cart = new CartPage(page);
  let tabe = await cart.getTableRow();

  let singleItemPrice = this.scenarioContext?.get("Price").replace("$", "");
  let quantity = this.scenarioContext?.get("Quantity");
  let totalPrice = (await tabe?.total?.textContent())?.replace("$", "");

  let excpectedValue = parseFloat((singleItemPrice * quantity).toString());
  let actualValue = parseFloat(totalPrice + "");

  console.log(
    "Verifying single Item Price * Quantity items [" +
      excpectedValue +
      "] should be equal to Total Price [" +
      actualValue +
      "]"
  );
  expect(excpectedValue).toEqual(actualValue);
});
