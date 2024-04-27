import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeliveriesTableComponent } from './user-deliveries-table.component';

describe('UserDeliveriesTableComponent', () => {
  let component: UserDeliveriesTableComponent;
  let fixture: ComponentFixture<UserDeliveriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDeliveriesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDeliveriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
