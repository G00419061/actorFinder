import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActorSearchComponent } from './actor-search.component';

describe('ActorSearchComponent', () => {
  let component: ActorSearchComponent;
  let fixture: ComponentFixture<ActorSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ActorSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
