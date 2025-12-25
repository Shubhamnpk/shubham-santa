export interface GiftData {
  recipient: string;
  giftName: string;
  message: string;
  theme: 'luxury' | 'whimsical' | 'tech' | 'classic' | 'inspiration';
  isInList: boolean;
}

export interface SnowFlake {
  id: number;
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
}