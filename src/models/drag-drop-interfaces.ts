// Drag & Drop
export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface Dragtarget {
  dragOverHandler(event: DragEvent): void;
  dragHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
