import { ComponentService } from './component.service';
import { Shared } from '../providers/shared.provider';

export class DragAndDrop {
  componentService: ComponentService;
  selector: string;

  el: HTMLElement;
  parentElement: HTMLElement | null;
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
    if (this.parentElement)
      this.initialIndex = Array.from(this.parentElement.children)?.indexOf(this.el);
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
    this.el.onmouseover = null;
    this.el.onmouseout = null;
    for (const e of this.elementEvents)
      this.el.removeEventListener(e[0], e[1]);
    for (const e of this.selectEvents)
      document.removeEventListener(e[0], e[1]);
  }

  registerSelectedEvents(): void {
    this.registerResizeEvents();
    this.registerDragEvents();
  }

  deRegisterSelectedEvents(): void {
    this.deRegisterResizeEvents();
    this.deRegisterDragEvents();
  }

  registerResizeEvents(): void {
    const cursorEvent = (e: MouseEvent) => {
      const rect = this.el.getBoundingClientRect();
      if (
        (e.clientX < rect.left && e.clientX > rect.left - 8) ||
        (e.clientX < rect.right + 8 && e.clientX > rect.right - 8)
      ) {
        document.body.style.cursor = 'ew-resize';
      } else if (
        (e.clientY < rect.top + 8 && e.clientY > rect.top - 8) ||
        (e.clientY < rect.bottom + 8 && e.clientY > rect.bottom - 8)
      ) {
        document.body.style.cursor = 'ns-resize';
      } else {
        document.body.style.cursor = 'initial';
      }
    };
    this.resizeEvents.push(['mousemove', cursorEvent as EventListener]);
    document.addEventListener('mousemove', cursorEvent);
  }

  deRegisterResizeEvents(): void {
    for (const e of this.resizeEvents)
      document.removeEventListener(e[0], e[1]);
  }

  registerDragEvents(): void {
    this.el.onmousedown = (e: MouseEvent) => {
      e.stopPropagation();

      document.body.style.cursor = 'move';
      (this.el as any).initialDisplayStyle = this.el.style.display;
      this.dragging = true;

      const mousemove = this.mousemove.bind(this);
      const mouseup = this.mouseup.bind(this);
      this.dragEvents.push(['mousemove', mousemove]);
      this.dragEvents.push(['mouseup', mouseup]);
      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseup);
    };
  }

  mousemove(e: MouseEvent) {
    if (!this.dragging) return;

    // TODO: show empty rows

    this.el.style.display = 'none';
    const droppable = document.elementFromPoint(e.clientX, e.clientY)?.closest(this.selector);
    this.el.style.display = 'initial';
    if (!droppable || droppable.id == this.el.id) return;

    const dropParentEl = droppable.parentElement;
    if (!dropParentEl) return;

    try {
      if (e.clientX < dropParentEl.getBoundingClientRect().left + (dropParentEl.offsetWidth / 2) ||
        e.clientY < dropParentEl.getBoundingClientRect().top - (dropParentEl.offsetHeight / 2)) {
        dropParentEl.insertBefore(this.el, droppable);
      } else {
        dropParentEl.insertBefore(this.el, droppable.nextSibling);
      }
    } catch { } // eslint-disable-line
  }

  mouseup(e: MouseEvent) {
    // TODO: hide empty row/column elements

    this.dragging = false;
    document.body.style.cursor = 'initial';

    // TODO: Update layout config.

    for (const e of this.dragEvents)
      document.removeEventListener(e[0], e[1]);
  }

  deRegisterDragEvents(): void {
    this.dragging = false;
    this.el.onmousedown = null;
    for (const e of this.dragEvents)
      document.removeEventListener(e[0], e[1]);
  }

  destroy() {
    this.deRegisterDragEvents();
    this.deRegisterResizeEvents();
    this.deRegisterSelectedEvents();
    this.deRegisterSelectEvents();
  }
}
