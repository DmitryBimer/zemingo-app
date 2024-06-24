export interface IProduct {
  name: string;
}

export interface IInventoryItem {
  name: IProduct['name'];
  quantity: number;
}
