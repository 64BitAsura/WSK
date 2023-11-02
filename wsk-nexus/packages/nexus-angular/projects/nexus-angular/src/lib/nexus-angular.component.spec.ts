import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { StencilLibraryAngularComponent } from './nexus-angular.component';

describe('StencilLibraryAngularComponent', () => {
  let component: StencilLibraryAngularComponent;
  let fixture: ComponentFixture<StencilLibraryAngularComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StencilLibraryAngularComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StencilLibraryAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
