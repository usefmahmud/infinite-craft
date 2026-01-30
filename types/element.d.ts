export interface IElement {
  text: string;
  emoji: string;
}

export interface IActiveElement extends IElement {
  id: string;
  x: number;
  y: number;
}
