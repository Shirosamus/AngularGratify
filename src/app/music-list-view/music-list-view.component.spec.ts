import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicListViewComponent } from './music-list-view.component';

describe('MusicListViewComponent', () => {
  let component: MusicListViewComponent;
  let fixture: ComponentFixture<MusicListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
