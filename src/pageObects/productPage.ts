import { Page } from "@playwright/test";
import { config } from "../support/config";

export class ProductPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  getPrice() {
    return this.page.locator("//div[@class='productfilneprice']");
  }

  getRate() {
    return this.page.$$("//ul[@class='rate']/li[@class='on']");
  }

  getFullName() {
    return this.page.locator(
      "//*[@id='product_details']//*[@class='productname']/span"
    );
  }

  getCartButton() {
    return this.page.locator("//ul[@class='productpagecart']");
  }

  async getQuantityTextField() {
    return this.page.locator("//input[@id='product_quantity']");
  }

  async openProductPage(
    categoryId: string,
    subcategoryId: string,
    productId: string
  ) {
    // https://automationteststore.com/index.php?rt=product/product&path=65_66&product_id=111
    await this.page.goto(
      config.BASE_URL +
        "index.php?rt=product/product&path=" +
        categoryId +
        "_" +
        subcategoryId +
        "&product_id=" +
        productId
    );
  }
}
