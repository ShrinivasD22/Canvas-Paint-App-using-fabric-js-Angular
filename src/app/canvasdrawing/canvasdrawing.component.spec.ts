import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasDrawingComponent } from './canvasdrawing.component';

describe('CanvasdrawingComponent', () => {
  let component: CanvasDrawingComponent;
  let fixture: ComponentFixture<CanvasDrawingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanvasDrawingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




