export interface Ristorante {
  name: string;
  imglog: string;
  imgthumbnails: string;
  category: string;
  id: number;
  menu: [
    {
      name: string;
      price: string;
      imgthumbnail: string;
      id: number;
      restaurantId: number;
    }
  ];
}
