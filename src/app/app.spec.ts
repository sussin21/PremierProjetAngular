import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
describe('App', () => {
 it('renders the navigation and route outlet', async () => {
   TestBed.configureTestingModule({ imports: [App], providers: [provideRouter([])] });
   const fixture = TestBed.createComponent(App); await fixture.whenStable();
   expect(fixture.nativeElement.querySelector('router-outlet')).toBeTruthy();
   expect(fixture.nativeElement.textContent).toContain('Home');
 });
});
