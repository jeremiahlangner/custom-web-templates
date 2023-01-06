export class DragAndDrop {
  el: HTMLElement;
  dragExceptions: string[];
  dragging: boolean;
  selected: boolean;

  constructor(
    el: HTMLElement,
    dragExceptions: string[]
  ) {
    this.el = el;
    this.dragExceptions = dragExceptions;
    this.registerEvents();
  }

  registerEvents() {
    const elementEvents = [
    ];
    const documentEvents = [
    ];
  }

  handleDragEvents() {

  }
}
