export enum Categories {
  BOOKS = 65,
  MAN = 58,
  APPAREL_N_ACCESSORIES = 68,
}

export enum SubCategories {
  /*BOOKS*/ AUDIO_CD = 66,
  /*BOOKS*/ PAPERBACK = 67,
  /*APPAREL_N_ACCESSORIES*/ T_SHIRTS = 70,
}

export enum Products {
  /*AUDIO_CD*/ NEW_FRENCH_WITH_EASE = 111,
  /*PAPERBACK*/ PAPER_TOWNS_BY_JOHN_GREEN = 67,
  /*T_SHIRTS*/ CASUAL_3_4_SLEEVE_BASEBALL_T_SHIRT = 123,
}

export function getCategoryId(text: string) {
  return EnamToId(text, Categories);
}

export function getSubCategoryId(text: string) {
  return EnamToId(text, SubCategories);
  // return SubCategories[text.toUpperCase() as keyof typeof SubCategories];
}

export function getProductId(text: string) {
  return EnamToId(text, Products);
}

export function EnamToId(text: string, product: object) {
  text = text
    .toUpperCase()
    .replaceAll("/", "_")
    .replaceAll(" ", "_")
    .replaceAll("&", "N")
    .replaceAll("-", "_");
  const index = Object.keys(product).lastIndexOf(text);
  const index2 = Math.floor(index / 2);
  const vlue = Object.keys(product)[index2];
  return vlue;
}

export enum CartTable {
  IMAGE = 1,
  NAME = 2,
  MODEL = 3,
  UNIT_PRICE = 4,
  QUANTITY = 5,
  TOTAL = 6,
  REMOVE = 7,
}
