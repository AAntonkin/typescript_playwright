import { Page } from "@playwright/test";
import { CartTable } from "../objects/enums";

export class CartPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  getUrl() {
    return "";
  }
  getTableRow(rowNumber: number = 2) {
    const locator =
      "div[class='container-fluid cart-info product-list'] table tbody tr:nth-child(" +
      rowNumber +
      ") td:nth-child(%s)";
    var get_locator = (tableC: Object) => {
      return this.page.locator(locator.replace("%s", tableC.toString()));
    };

    return {
      image: get_locator(CartTable.IMAGE),
      name: get_locator(CartTable.NAME),
      model: get_locator(CartTable.MODEL),
      unit_price: get_locator(CartTable.UNIT_PRICE),
      quantity: get_locator(CartTable.QUANTITY),
      total: get_locator(CartTable.TOTAL),
      remove: get_locator(CartTable.REMOVE),
    };
  }
}
