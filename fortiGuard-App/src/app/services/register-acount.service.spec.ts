import { TestBed } from '@angular/core/testing';

import { RegisterAcountService } from './register-acount.service';

describe('RegisterAcountService', () => {
  let service: RegisterAcountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterAcountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
