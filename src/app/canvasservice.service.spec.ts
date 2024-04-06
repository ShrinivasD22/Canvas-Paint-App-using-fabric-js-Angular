import { TestBed } from '@angular/core/testing';

import { CanvasserviceService } from './canvasservice.service';

describe('CanvasserviceService', () => {
  let service: CanvasserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
