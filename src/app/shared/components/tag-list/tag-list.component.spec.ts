import { ComponentFixture, TestBed } from '@angular/core/testing';

import { tagListComponent } from './tag-list.component';

describe('tagListComponent', () => {
  let component: tagListComponent;
  let fixture: ComponentFixture<tagListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [tagListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(tagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
