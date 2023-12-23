import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateAccountComponent } from './form-update-account.component';

describe('FormUpdateAccountComponent', () => {
  let component: FormUpdateAccountComponent;
  let fixture: ComponentFixture<FormUpdateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
