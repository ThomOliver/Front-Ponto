export interface Artwork {
  id: string;
  title: string;
  titleEn?: string;
  titleEs?: string;
  titleCn?: string;
  imageUrl: string;
  position: number;
  category: { id: string; name: string };
  isHighlighted: boolean
    // opcionais
  description?: string;
  descriptionEn?: string;
  descriptionEs?: string;
  descriptionCn?: string;
  materialEn?: string;
  materialEs?: string;
  materialCn?: string;
  material?: string;
  ano?: number | null;   
  price?: number | null;
  isSold?: boolean;
  amount?: number | null;  
  metric?: string;     
  toSell?: boolean;  
  isPrint?: boolean;
  pricePrint?: number | null;
  amountPrint?: number | null;
  createdAt?: string | null;
}

export interface ArtworkInput {
  title: string;
  titleEn?: string;
  titleEs?: string;
  titleCn?: string;
  imageUrl: string;
  position: number;
  categoryId: string;
  isHighlighted: boolean;

  // opcionais
  description?: string;
  descriptionEn?: string;
  descriptionEs?: string;
  descriptionCn?: string;
  materialEn?: string;
  materialEs?: string;
  materialCn?: string;
  material?: string;
  ano?: number | null; 
  price?: number | null;
  isSold?: boolean;
  amount?: number | null;  
  metric?: string;     
  toSell?: boolean;
  isPrint?: boolean;
  pricePrint?: number | null;
  amountPrint?: number | null;  
}


export interface ArtworkFormData {
  title: string;
  imageUrl: string;
  position: number;
  categoryId: string;
}