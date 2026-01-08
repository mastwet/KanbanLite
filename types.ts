export interface Card {
  id: string;
  title: string;
  description: string;
  createdAt: number;
}

export interface Column {
  id: string;
  title: string;
  cardIds: string[];
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
  cards: Record<string, Card>; // Normalized card storage
  createdAt: number;
}

export type ThemeColor = 'blue' | 'green' | 'red' | 'amber' | 'indigo' | 'slate';