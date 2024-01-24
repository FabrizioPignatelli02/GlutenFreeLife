export interface Ristorante {
  name: string;
  imglogo: string;
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
