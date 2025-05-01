import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoSearchPage } from './photo-search.page';

describe('PhotoSearchPage', () => {
  let component: PhotoSearchPage;
  let fixture: ComponentFixture<PhotoSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
