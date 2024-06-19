import { TestBed } from '@angular/core/testing';

import { NgxResizeableService } from './ngx-resizeable.service';

describe('NgxResizeableService', () => {
  let service: NgxResizeableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxResizeableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
