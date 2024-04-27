import { TestBed } from '@angular/core/testing';

import { UpdateDeliveryService } from './update-delivery.service';

describe('UpdateDeliveryService', () => {
  let service: UpdateDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
