export class carObject {
  readonly make: string;
  readonly model: string;
  readonly year: string;
  readonly type: string;
  readonly zeroToSixty: string;
  readonly price: string;
  constructor(arg: {
    make: string;
    model: string;
    year: string;
    type: string;
    zeroToSixty: string;
    price: string;
  }) {
    this.make = arg.make;
    this.model = arg.model;
    this.year = arg.year;
    this.type = arg.type;
    this.zeroToSixty = arg.zeroToSixty;
    this.price = arg.price;
  }
}
