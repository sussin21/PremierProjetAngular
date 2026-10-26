import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ConferanceDetails } from './conferance-details';
describe('ConferanceDetails', () => {
 it('handles an unknown id without crashing', async () => {
   TestBed.configureTestingModule({ imports: [ConferanceDetails], providers: [provideRouter([])] });
   const fixture = TestBed.createComponent(ConferanceDetails);
   fixture.componentRef.setInput('id', '999'); await fixture.whenStable();
   expect(fixture.nativeElement.textContent).toContain('introuvable');
 });
});
