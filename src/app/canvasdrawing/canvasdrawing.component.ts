import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-canvasdrawing',
  templateUrl: './canvasdrawing.component.html',
  styleUrls: ['./canvasdrawing.component.scss']
})
export class CanvasDrawingComponent implements AfterViewInit {
  @ViewChild('canvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;
  canvas!: fabric.Canvas;
  isDrawing: boolean = false;
  shape: fabric.Object | null = null; // Track the currently drawn shape
  shapeStartPosition: fabric.Point | null = null; // Track the starting position of the shape
  brushWidth: number = 5;
  selectedColor: string = '#000000';
  selectedTool: string = 'brush';
  enableColorFill: boolean = false;
  activeObject: fabric.Object | null = null;
   // Log enableColorFill whenever its value changes
   toggleColorFill() {
    console.log('enableColorFill:', this.enableColorFill);
  }

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit: Initializing canvas');
    this.canvas = new fabric.Canvas(this.canvasRef.nativeElement, {
      isDrawingMode: false,
      selection:true,

    });
    console.log('ngAfterViewInit: Canvas initialized');
    this.canvas.freeDrawingBrush.width = this.brushWidth;
    this.canvas.freeDrawingBrush.color = this.selectedColor;
    this.setCanvasBackground();
    this.setupEventListeners();
  }

  setCanvasBackground() {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: '#fff',
      selectable:true,
      // width: this.canvas.width,
      // height: this.canvas.height
      width:100,
      height:100
    });
    this.canvas.add(rect);
  }



  setupEventListeners() {
    this.canvas.on('mouse:down', (event: fabric.IEvent) => {
      if (this.selectedTool === 'rectangle' || this.selectedTool === 'circle' || this.selectedTool === 'triangle') {
        console.log("selectedshape",this.selectedTool);
        this.startDrawShape(event);
      } else if (this.selectedTool === 'text') {
        this.startDrawText(event);
      }
    });

    this.canvas.on('mouse:move', (event: fabric.IEvent) => {
      if (this.isDrawing && this.shapeStartPosition) {
        this.updateShape(event);
      }
    });

    this.canvas.on('mouse:up', () => {
      if (this.isDrawing) {
        this.endDrawShape();
      }
    });



// Check if there are selectable objects on the canvas
const objects = this.canvas.getObjects();
let selectableObjectsExist = false;

for (const obj of objects) {
    if (obj.selectable) {
        selectableObjectsExist = true;
        break;
    }
}

if (selectableObjectsExist) {
    // At least one selectable object exists on the canvas
    console.log('Selectable objects exist on the canvas.');
} else {
    // No selectable objects found on the canvas
    console.log('No selectable objects on the canvas.');
}


this.canvas.on('mouse:down', (event: fabric.IEvent) => {
  // Get pointer coordinates
  const pointer = this.canvas.getPointer(event.e);

  // Convert pointer coordinates to a Point object
  const pointerPoint = new fabric.Point(pointer.x, pointer.y);

  // Get all objects at the pointer coordinates
  const objectsAtPointer = this.canvas.getObjects().filter(obj => {
    return obj.containsPoint(pointerPoint);
  });

  // Check if any objects are found
  if (objectsAtPointer.length > 0) {
    // Iterate through the objects to find the selectable one
    for (const obj of objectsAtPointer) {
      if (obj.selectable) {
        // Apply color fill or any other action
        this.applyColorFill(obj);
        return; // Exit the loop after finding the first selectable object
      }
    }

    // If no selectable object is found
    console.log('No selectable object found at pointer coordinates.');
  } else {
    // If no objects are found at the pointer coordinates
    console.log('No objects found at pointer coordinates.');
  }
});

    // this.canvas.on('mouse:down', (event: fabric.IEvent) => {
    //   console.log('selection created event started')

    //   const activeObject = event.target;
    //   if (activeObject && activeObject.selectable) {
    //     // this.activeObject = activeObject;
    //     console.log('Object selected:', activeObject);

    //     this.applyColorFill(activeObject);

    //   }
    // });

  }

  startDrawShape(event: fabric.IEvent) {
    console.log('startDrawshape:Drawing shape....');
    this.isDrawing = true;
    const pointer = this.canvas.getPointer(event.e);
    this.shapeStartPosition = new fabric.Point(pointer.x, pointer.y);

    switch (this.selectedTool) {
      case 'rectangle':
        console.log('startDrawshape: Creatimg rectangle shape....');
        this.shape = new fabric.Rect({
          left: pointer.x,
          top: pointer.y,
          width: 0,
          height: 0,
          fill: 'transparent',
          stroke: this.selectedColor,
          strokeWidth: this.brushWidth,
          selectable:true

        });
        break;
      case 'circle':
        console.log('startDrawShape:Creating circle shape....');
        this.shape = new fabric.Circle({
          left: pointer.x,
          top: pointer.y,
          radius: 0,
          fill: 'transparent',
          stroke: this.selectedColor,
          strokeWidth: this.brushWidth,
          selectable:true
        });
        break;
      case 'triangle':
        console.log('startDrawShape: Creating triangle shape...');
        this.shape = new fabric.Triangle({
          left: pointer.x,
          top: pointer.y,
          width: 0,
          height: 0,
          fill: 'transparent',
          stroke: this.selectedColor,
          strokeWidth: this.brushWidth,
          selectable:true
        });
        break;
    }

    if (this.shape) {
      console.log('startDrawShape: Adding shape to canvas...');
      this.canvas.add(this.shape);
    }
  }

  updateShape(event: fabric.IEvent) {
    if (this.shape && this.shapeStartPosition) {
      const pointer = this.canvas.getPointer(event.e);

      switch (this.selectedTool) {
        case 'rectangle':
          const deltaX = pointer.x - this.shapeStartPosition.x;
          const deltaY = pointer.y - this.shapeStartPosition.y;
          this.shape.set({ width: deltaX, height: deltaY });
          break;
        case 'circle':
          const deltaXCircle = pointer.x - this.shapeStartPosition.x;
          const deltaYCircle = pointer.y - this.shapeStartPosition.y;
          const radius = Math.sqrt(deltaXCircle ** 2 + deltaYCircle ** 2) / 2;
          (this.shape as fabric.Circle).set({ radius: radius });
          break;
        case 'triangle':
          const deltaXTriangle = pointer.x - this.shapeStartPosition.x;
          const deltaYTriangle = pointer.y - this.shapeStartPosition.y;
          this.shape.set({ width: deltaXTriangle, height: deltaYTriangle });
          break;
      }

      this.canvas.renderAll();
    }
  }

  endDrawShape() {
    this.isDrawing = false;
    this.shape = null;
    this.shapeStartPosition = null;
  }

  startDrawText(event: fabric.IEvent) {
    console.log('startDrawText: Initializing text drawing...');
    if (!event.pointer){
      console.log('startDrawText: No pointer event found, exiting.');
      return;
    }
    const text = prompt('Enter your text:');
    if (text) {
      console.log('startDrawText: Text entered:', text);
      const newText = new fabric.Textbox(text, {
        left: event.pointer.x,
        top: event.pointer.y,
        fill: this.selectedColor
      });
      console.log('startDrawText: Adding text to canvas:', newText);
      this.canvas.add(newText);
      console.log('startDrawText: Text added to canvas.');
    }
    else {
      console.log('startDrawText: No text entered, exiting.');
    }
  }

  changeTool(tool: string) {
    this.selectedTool = tool;

    if (tool === 'brush') {
      this.canvas.isDrawingMode = true;
      this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
      this.canvas.freeDrawingBrush.color = this.selectedColor;
      this.canvas.freeDrawingBrush.width = this.brushWidth;
    } else {
      this.canvas.isDrawingMode = false;
      this.canvas.selection = false;
    }
  }
  changeColor(color: string) {
    this.selectedColor = color;

    // Update brush color immediately after changing the selected color
    if (this.selectedTool === 'brush' || this.selectedTool === 'eraser' || this.selectedTool === 'freehand') {
      this.canvas.freeDrawingBrush.color = this.selectedColor;
    }

    // If the selected tool is not brush, update the color of existing shapes
    if (this.selectedTool !== 'brush') {
      this.canvas.getObjects().forEach(obj => {
        if (obj instanceof fabric.Path) { // Update brush color for freehand drawing
          obj.set('stroke', this.selectedColor);
          obj.set('dirty', true); // Forces redrawing the object
        } else { // Update fill or stroke color for other shapes
          obj.set('fill', this.selectedColor);
          obj.set('stroke', this.selectedColor);
        }
      });
      this.canvas.requestRenderAll(); // Render canvas to apply the changes
    }
  }

  clearCanvas() {
    this.canvas.clear();
    this.setCanvasBackground();
  }

  saveImage() {
    const link = document.createElement('a');
    link.download = `${Date.now()}.jpg`;
    link.href = this.canvas.toDataURL();
    link.click();
  }


  applyColorFill(activeObject:fabric.Object) {
    console.log('applyColorFill method called');
    console.log('enableColorFill:', this.enableColorFill);

    if (this.enableColorFill) {
      console.log('Color fill functionality is enabled');
// // Check if there are selectable objects on the canvas
// const objects = this.canvas.getObjects();
// let selectableObjectsExist = false;

// for (const obj of objects) {
//     if (obj.selectable) {
//         selectableObjectsExist = true;
//         break;
//     }
// }

// if (selectableObjectsExist) {
//     // At least one selectable object exists on the canvas
//     console.log('Selectable objects exist on the canvas.');
// } else {
//     // No selectable objects found on the canvas
//     console.log('No selectable objects on the canvas.');
// }

      if (this.activeObject instanceof fabric.Path || this.activeObject instanceof fabric.Rect || this.activeObject instanceof fabric.Circle || this.activeObject instanceof fabric.Triangle) {
        // Cast activeObject to the appropriate type
        const obj = this.activeObject as fabric.Rect;


        // Change the type to fabric.Rect or any other fabric object type as needed
        console.log(' activeobject:', obj);
        // Apply fill color to the active object
        obj.set('fill', this.selectedColor);
        this.canvas.renderAll();
        console.log('Fill color applied to the selected object:', this.selectedColor);
      } else {
        console.log('No object selected or not a valid shape');
      }
    } else {
      console.log('Color fill functionality is disabled');
    }
  }

}


