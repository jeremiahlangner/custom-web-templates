import { ComponentService } from './component.service';
import { Shared } from '../providers/shared.provider';

export class DragAndDrop {
  componentService: ComponentService;
  el: HTMLElement;
  parentElement: HTMLElement;
  initialIndex: number;

  dragging: boolean;
  selected: boolean;
  hovering: boolean;
  resizing: boolean;

  selectEvents: [keyof DocumentEventMap, EventListener][] = [];
  elementEvents: [keyof DocumentEventMap, EventListener][] = [];
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
    this.parentElement = this.el.parentElement;
    this.initialIndex = Array.from(this.parentElement?.children)?.indexOf(this.el);
    this.dragExceptions = dragExceptions;
    this.init();
    this.registerSelectEvents();
  }

  async init() {
    this.componentService = await Shared.getService('ComponentService');
  }

  registerSelectEvents(): void {
    this.el.ondragstart = () => false;

    this.el.onmouseover = (e: MouseEvent) => {
      e.stopPropagation();
      this.hovering = true;
      this.el.classList.add('hovered');
    };

    this.el.onmouseout = (e: MouseEvent) => {
      e.stopPropagation();
      this.hovering = false;
      this.el.classList.remove('hovered');
    };

    const select = this.select.bind(this);
    const deselect = this.select.bind(this);

    this.elementEvents.push(['click', select]);
    this.selectEvents.push(['click', deselect]);
    this.el.addEventListener('click', select);
    document.addEventListener('click', deselect);
  }

  select(e: MouseEvent) {
    e.stopPropagation();

    // deselect all elements when new item selected
    document.dispatchEvent(new Event('click'));

    if ((e.target as HTMLElement).tagName in this.dragExceptions) return;

    this.selected = true;
    this.el.classList.add('selected');
    this.registerSelectedEvents();
  }

  deselect(e: MouseEvent) {
    if (!e.target || e.target !== this.el) {
      this.selected = false;
      this.el.classList.remove('selected');
    }
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
