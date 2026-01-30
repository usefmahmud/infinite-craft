export interface IElement {
  text: string;
  emoji: string;
}

export interface IPlaygroundElement extends IElement {
  id: string;
  x: number;
  y: number;
}
