import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxResizeableComponent } from './ngx-resizeable.component';

describe('NgxResizeableComponent', () => {
  let component: NgxResizeableComponent;
  let fixture: ComponentFixture<NgxResizeableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxResizeableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxResizeableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
