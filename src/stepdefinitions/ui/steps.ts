import { ICustomWorld } from "../../support/custom-world";
import { config } from "../../support/config";
import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getCategoryId } from "../../objects/enums";
import { ProductPage } from "../../pageObects/productPage";

Given("User opens test site", async function (this: ICustomWorld) {
  const page = this.page!;
  await page.goto(config.BASE_URL);
  await expect(page).toHaveTitle(/A place to practice your automation skills!/);
});

When(
  "User selects {string} category",
  async function (this: ICustomWorld, filter: string) {
    const page = this.page!;
    const categoryId = getCategoryId(filter);
    const categoryLocator = page.locator(
      "//*[contains(text(),'" + filter + "') and @href]"
    );
    await categoryLocator.click();
    await expect(page.url()).toContain(categoryId.toString());
  }
);

When(
  "User selects {string} sub-category",
  async function (this: ICustomWorld, subcategory: string) {
    const page = this.page!;
    const subCategoryLocator = page.locator(
      "//a[.='" + subcategory + "' and @href]"
    );
    await subCategoryLocator.click();
    const subCategoryOpened = page.locator(
      "//h1[*[@class='maintext' and text()='" + subcategory + "']]"
    );
    await expect(subCategoryOpened).toBeVisible();
  }
);

When(
  "User selects {string} product",
  async function (this: ICustomWorld, product: string) {
    const page = this.page!;
    const productLocator = page.locator(
      "//div[a[@class='prdocutname' and contains(@title,'" + product + "')]]"
    );
    await productLocator.click();
    const productOpened = page.locator(
      "//*[*[@id='product_details' and contains(.,'" + product + "')]]"
    );
    await expect(productOpened).toBeVisible();
  }
);

Then(
  "User see opened {string} product details:",
  async function (
    this: ICustomWorld,
    product: string,
    fieldsToVerify: DataTable
  ) {
    const page = this.page!;
    const productPage = new ProductPage(page);
    const productHeader = page.locator(
      "//*[*[@id='product_details' and contains(.,'" + product + "')]]"
    );
    await expect(productHeader).toBeVisible();
    const expected = fieldsToVerify.hashes()[0];
    for (var name in expected) {
      switch (name) {
        case "Full Name":
          await expect(productPage.getFullName()).toBeVisible();
          await expect(productPage.getFullName()).toContainText(expected[name]);
          break;
        case "Rate":
          await expect((await productPage.getRate()).length.toString()).toEqual(
            expected[name]
          );
          break;
        case "Price":
          await expect(await productPage.getPrice()).toBeVisible();
          await expect(await productPage.getPrice()).toContainText(
            expected[name]
          );
          break;
      }
    }
  }
);
