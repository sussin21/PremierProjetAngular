import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferanceList } from './conferance-list';

describe('ConferanceList', () => {
  let component: ConferanceList;
  let fixture: ComponentFixture<ConferanceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferanceList], providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferanceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
