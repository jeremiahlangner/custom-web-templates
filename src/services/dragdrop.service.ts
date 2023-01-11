import { ComponentService } from './component.service';

export class DragAndDrop {
  componentService: ComponentService;
  el: HTMLElement;

  dragging: boolean;
  selected: boolean;

  selectEvents: [keyof DocumentEventMap, EventListener][] = [];
  dragEvents: [keyof DocumentEventMap, EventListener][] = [];
  resizeEvents: [keyof DocumentEventMap, EventListener][] = [];

  dragExceptions: string[];
  permissions: boolean;

  constructor(
    el: HTMLElement,
    config: any,
    dragExceptions: string[]
  ) {
    this.el = el;
    this.dragExceptions = dragExceptions;
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
