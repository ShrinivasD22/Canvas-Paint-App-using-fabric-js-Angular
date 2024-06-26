import { AfterViewInit, Component,  ElementRef, OnChanges, Renderer2, ViewChild,SimpleChanges } from '@angular/core';
import { fabric } from 'fabric';




@Component({
  selector: 'app-canvasdrawing',
  templateUrl: './canvasdrawing.component.html',
  styleUrls: ['./canvasdrawing.component.scss'],

})
export class CanvasDrawingComponent implements AfterViewInit,OnChanges{
[x: string]: any;
  @ViewChild('canvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;
  canvas!: fabric.Canvas;
  selectedShape:fabric.Object | null = null;
  isDrawing: boolean = true;
  shape: fabric.Object | null = null; // Track the currently drawn shape
  shapeStartPosition: fabric.Point | null = null; // Track the starting position of the shape
  brushWidth: number = 5;
  selectedColor: string = '#000000';
  selectedTool: string = 'brush';
  enableColorFill: boolean = false;
  enabledelete:boolean=false;
  isDragging: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedtool' in changes) {
      this.selectionTool(this.tool);
    }
  }

   toggleColorFill() {
    console.log('enableColorFill:', this.enableColorFill);
  }

  toggleDelete(){
    this.enabledelete=true;
    console.log('enabledelete',this.enabledelete);
  }
  constructor(private renderer: Renderer2,
    ) { }


  tool:any;
  ngAfterViewInit(): void {

    console.log('ngAfterViewInit: Initializing canvas');
    this.canvas = new fabric.Canvas(this.canvasRef.nativeElement, {
      isDrawingMode: true,
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
        // this.Canvas.startDrawShape(event);
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

  }

  startDrawShape(event: fabric.IEvent) {
    console.log('startDrawshape:Drawing shape....');
    this.isDrawing = true;
    const pointer = this.canvas.getPointer(event.e);
    this.shapeStartPosition = new fabric.Point(pointer.x, pointer.y);

    switch (this.selectedTool) {
      case 'rectangle':
        this.shape = new fabric.Rect({
          left: pointer.x,
          top: pointer.y,
          width: 0,
          height: 0,
          fill: this.enableColorFill ? this.selectedColor : 'transparent',
          stroke: this.selectedColor,
          strokeWidth: this.brushWidth,
          selectable: true,
          lockMovementX: false,
          lockMovementY: false,

        });
        break;
      case 'circle':
        console.log('startDrawShape:Creating circle shape....');
        this.shape = new fabric.Circle({
          left: pointer.x,
          top: pointer.y,
          radius: 0,
          // fill: 'transparent',
          fill: this.enableColorFill ? this.selectedColor : 'transparent',
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
          // fill: 'transparent',
          fill: this.enableColorFill ? this.selectedColor : 'transparent',
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


  selectShape(tool: string) {
    this.selectedTool = tool;
    const activeObject = this.canvas.getActiveObject();
    console.log("selectedshape:", activeObject);
    this.canvas.isDrawingMode = false;
    this.canvas.selection = false;
    if (this.enabledelete && activeObject) {
      console.log('delete shape method calling');
      this.deleteSelectedShape(activeObject);
    }

  }


deleteSelectedShape(activeObject: fabric.Object | null) {
  console.log('delete shape method calling');
  if (activeObject !== null) {
    this.canvas.remove(activeObject);
    this.canvas.renderAll();
  } else {
    console.log('No active object selected.');
  }
}


selectionTool(tool: string) {
  this.selectedTool = tool;
  const activeObject = this.canvas.getActiveObject();
  this.canvas.discardActiveObject();

  if (this.selectedTool === 'rectangle' || this.selectedTool === 'circle' || this.selectedTool === 'triangle') {
    console.log("selectedshape",this.selectedTool)
    this.canvas.isDrawingMode = false;
    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
    this.canvas.freeDrawingBrush.color = this.selectedColor;
    this.canvas.freeDrawingBrush.width = this.brushWidth;
  } else {
    this.canvas.isDrawingMode = false;
    this.canvas.selection = false;
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


  updateBrushColor(color:string) {
    if (this.selectedTool === 'brush' || this.selectedTool === 'eraser' || this.selectedTool === 'freehand') {
      // this.selectedColor= color;
      // Update the color of the free drawing brush
      this.canvas.freeDrawingBrush.color = color;
      // Call the setWidth method to ensure the change is applied
      this.canvas.freeDrawingBrush.width = this.brushWidth;
    }
  }





}
function toggleEditMode() {
  throw new Error('Function not implemented.');
}
