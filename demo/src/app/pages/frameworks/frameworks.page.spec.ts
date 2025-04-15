import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameworksPage } from './frameworks.page';

describe('FrameworksPage', () => {
  let component: FrameworksPage;
  let fixture: ComponentFixture<FrameworksPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameworksPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrameworksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
