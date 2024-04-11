// import { ElementRef, Injectable } from '@angular/core';
// import { fabric } from 'fabric';

// @Injectable({
//   providedIn: 'root'
// })
// export class CanvasService {
//   canvasRef!: ElementRef<HTMLCanvasElement>;
//   canvas!: fabric.Canvas;
//   selectedShape:fabric.Object | null = null;
//   isDrawing: boolean = true;
//   shape: fabric.Object | null = null; // Track the currently drawn shape
//   shapeStartPosition: fabric.Point | null = null; // Track the starting position of the shape
//   brushWidth: number = 5;
//   selectedColor: string = '#000000';
//   selectedTool: string = 'brush';
//   enableColorFill: boolean = false;
//   enabledelete:boolean=false;
//   isDragging: boolean = false;
//   constructor() { }





//   startDrawShape(event: fabric.IEvent) {
//     console.log('startDrawshape:Drawing shape....');
//     this.isDrawing = true;
//     const pointer = this.canvas.getPointer(event.e);
//     this.shapeStartPosition = new fabric.Point(pointer.x, pointer.y);

//     switch (this.selectedTool) {
//       case 'rectangle':
//         console.log('rectangle drawing in switchcase');
//         this.shape = new fabric.Rect({
//           left: pointer.x,
//           top: pointer.y,
//           width: 0,
//           height: 0,
//           fill: this.enableColorFill ? this.selectedColor : 'transparent',
//           stroke: this.selectedColor,
//           strokeWidth: this.brushWidth,
//           selectable: true,
//           lockMovementX: false,
//           lockMovementY: false,

//         });
//         break;
//       case 'circle':
//         console.log('startDrawShape:Creating circle shape....');
//         this.shape = new fabric.Circle({
//           left: pointer.x,
//           top: pointer.y,
//           radius: 0,
//           // fill: 'transparent',
//           fill: this.enableColorFill ? this.selectedColor : 'transparent',
//           stroke: this.selectedColor,
//           strokeWidth: this.brushWidth,
//           selectable:true
//         });
//         break;
//       case 'triangle':
//         console.log('startDrawShape: Creating triangle shape...');
//         this.shape = new fabric.Triangle({
//           left: pointer.x,
//           top: pointer.y,
//           width: 0,
//           height: 0,
//           // fill: 'transparent',
//           fill: this.enableColorFill ? this.selectedColor : 'transparent',
//           stroke: this.selectedColor,
//           strokeWidth: this.brushWidth,
//           selectable:true
//         });
//         break;
//     }

//     if (this.shape) {
//       console.log('startDrawShape: Adding shape to canvas...');
//       this.canvas.add(this.shape);
//     }
//   }


//   endDrawShape() {
//     this.isDrawing = false;
//     this.shape = null;
//     this.shapeStartPosition = null;
//   }


//   updateShape(event: fabric.IEvent) {
//     if (this.shape && this.shapeStartPosition) {
//       const pointer = this.canvas.getPointer(event.e);

//       switch (this.selectedTool) {
//         case 'rectangle':
//           const deltaX = pointer.x - this.shapeStartPosition.x;
//           const deltaY = pointer.y - this.shapeStartPosition.y;
//           this.shape.set({ width: deltaX, height: deltaY });
//           break;
//         case 'circle':
//           const deltaXCircle = pointer.x - this.shapeStartPosition.x;
//           const deltaYCircle = pointer.y - this.shapeStartPosition.y;
//           const radius = Math.sqrt(deltaXCircle ** 2 + deltaYCircle ** 2) / 2;
//           (this.shape as fabric.Circle).set({ radius: radius });
//           break;
//         case 'triangle':
//           const deltaXTriangle = pointer.x - this.shapeStartPosition.x;
//           const deltaYTriangle = pointer.y - this.shapeStartPosition.y;
//           this.shape.set({ width: deltaXTriangle, height: deltaYTriangle });
//           break;
//       }

//       this.canvas.renderAll();
//     }
//   }


//   selectShape(tool: string) {
//     this.selectedTool = tool;
//     const activeObject = this.canvas.getActiveObject();
//     console.log("selectedshape:", activeObject);
//     this.canvas.isDrawingMode = false;
//     this.canvas.selection = false;
//     if (this.enabledelete && activeObject) {
//       console.log('delete shape method calling');
//       this.deleteSelectedShape(activeObject);
//     }

//   }


//   deleteSelectedShape(activeObject: fabric.Object | null) {
//     console.log('delete shape method calling');
//     if (activeObject !== null) {
//       this.canvas.remove(activeObject);
//       this.canvas.renderAll();
//     } else {
//       console.log('No active object selected.');
//     }
//   }







// }
