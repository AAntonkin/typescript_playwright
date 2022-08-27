import { ICustomWorld } from "../../support/custom-world";
import { expect } from "@playwright/test";
import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { carObject } from "../../apiObjects/carObject";

Given("Server is upp and running", async function (this: ICustomWorld) {
  const response = await this.server?.get("api/Cars/Saloon");
  expect(response).toBeDefined();
  expect(response?.ok()).toBeTruthy();
  console.log("Response: " + response?.ok());
});

When(
  "User send GET request with {string} type",
  async function (this: ICustomWorld, carType: string) {
    const response = await this.server?.get("/api/Cars/" + carType);
    this.scenarioContext?.set("Response", response);
    expect(response).toBeDefined();
    console.log("Response json: " + (await response?.json()));
  }
);

Then(
  "Server respose with {int} code",
  async function (this: ICustomWorld, responseCode: BigInteger) {
    const response = this.scenarioContext?.get("Response");
    expect(response.status()).toEqual(responseCode);
  }
);

Then(
  "Server respose have list of such fields and values:",
  async function (this: ICustomWorld, jsonFieldsAndValues: DataTable) {
    const response = this.scenarioContext?.get("Response");
    let carList = [];
    for (let resp of await response?.json()) {
      resp = new carObject(resp);
      carList.push(resp);
    }

    const expctedValues = jsonFieldsAndValues.hashes();

    for (let car in carList) {
      for (let row in expctedValues) {
        let fieldName = expctedValues[row]["Field Name"];
        let fieldValue = expctedValues[row]["Field Value"];

        /*carList[car][fieldValue] - Is not working... */

        if (fieldValue === "<not_empty>") {
          expect(
            Object.values(carList[car])[
              Object.keys(carList[car]).indexOf(fieldName)
            ]
          ).not.toEqual(NaN);
        } else {
          expect(
            Object.values(carList[car])[
              Object.keys(carList[car]).indexOf(fieldName)
            ]
          ).toEqual(fieldValue);
        }
      }
    }
  }
);
