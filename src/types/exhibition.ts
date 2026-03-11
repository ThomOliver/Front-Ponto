export interface Exhibition {
  id: string;
  title: string;
  titleEn?: string;
  titleEs?: string;
  titleCn?: string;
  imageUrl?: string;
  description?: string;
  descriptionEn?: string;
  descriptionEs?: string;
  descriptionCn?: string;
  date: string;
  position: number;
}

export interface ExhibitionInput {
  title: string;
  titleEn?: string;
  titleEs?: string;
  titleCn?: string;
  description?: string;
  descriptionEn?: string;
  descriptionEs?: string;
  descriptionCn?: string;
  date: string;
  endDate?: string;
  location?: string;
  imageUrl?: string
  position: number;
}
