import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasdrawingComponent } from './canvasdrawing.component';

describe('CanvasdrawingComponent', () => {
  let component: CanvasdrawingComponent;
  let fixture: ComponentFixture<CanvasdrawingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanvasdrawingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanvasdrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
