export class DragAndDrop {
  el: HTMLElement;
  preview: HTMLElement;

  dragging: boolean;
  selected: boolean;
  hovering: boolean;

  dragExceptions: string[];

  constructor(
    el: HTMLElement,
    dragExceptions: string[]
  ) {
    this.el = el;
    this.dragExceptions = dragExceptions;
    this.registerEvents();
  }

  registerSelectEvents(): void {
  }
  deRegisterSelectEvents(): void {
  }

  registerSelectedEvents(): void {
  }
  deRegisterSelectedEvents(): void {
  }

  registerResizeEvents(): void {
  }
  deRegisterResizeEvents(): void {
  }

  registerDragEvents(): void {
  }
  deRegisterDragEvents(): void {
  }

}
