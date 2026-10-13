import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';
describe('Conference routing', () => {
 it('supports legacy links, query input binding, nested outlets and the wildcard', async () => {
  const { withComponentInputBinding } = await import('@angular/router');
  TestBed.configureTestingModule({ providers: [provideRouter(routes, withComponentInputBinding())] });
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl('/list?search=Angular');
  expect(harness.routeNativeElement?.textContent).toContain('ANGULAR CONFERENCE');
  expect(harness.routeNativeElement?.textContent).not.toContain('JAVA CONFERENCE');
  await harness.navigateByUrl('/details/1');
  expect(harness.routeNativeElement?.textContent).toContain('Angular Conference');
  await harness.navigateByUrl('/missing');
  expect(harness.routeNativeElement?.querySelector('img')).toBeTruthy();
 });
});
