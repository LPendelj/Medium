import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTogglerComponent } from './feed-toggler.component';

describe('FeedToglerComponent', () => {
  let component: FeedTogglerComponent;
  let fixture: ComponentFixture<FeedTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedTogglerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
