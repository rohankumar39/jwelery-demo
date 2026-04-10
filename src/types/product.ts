export type JewelleryCategory = 'earrings' | 'necklace' | 'ring' | 'bracelet' | 'pendant';
export type TryOnType = 'face' | 'hand' | 'wrist' | 'neck';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: JewelleryCategory;
  price: number;
  description: string;
  shortDescription: string;
  images: string[];
  tryOnAsset: string;
  tryOnType: TryOnType;
  tryOnSupported: boolean;
  isFeatured: boolean;
  isNew: boolean;
  material: string;
  weight?: string;
  tags: string[];
  whatsappMessageTemplate: string;
}
