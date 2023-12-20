import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAcountComponent } from './register-acount.component';

describe('RegisterAcountComponent', () => {
  let component: RegisterAcountComponent;
  let fixture: ComponentFixture<RegisterAcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAcountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
