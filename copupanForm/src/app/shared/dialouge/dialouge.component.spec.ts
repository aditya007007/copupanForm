import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialougeComponent } from './dialouge.component';

describe('DialougeComponent', () => {
  let component: DialougeComponent;
  let fixture: ComponentFixture<DialougeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialougeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialougeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
