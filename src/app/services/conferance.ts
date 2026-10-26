import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, Subscription, catchError, defer, finalize, tap, throwError } from 'rxjs';
import { Conference, ConferenceDraft } from '../models/conference';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class Conferance {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/conferences`;
  private readonly state = signal<Conference[]>([]);
  private readonly loadingState = signal(false);
  private readonly savingState = signal(false);
  private readonly errorState = signal<string | null>(null);
  private loadSubscription?: Subscription;
  readonly conferences = this.state.asReadonly();
  readonly count = computed(() => this.conferences().length);
  readonly loading = this.loadingState.asReadonly();
  readonly saving = this.savingState.asReadonly();
  readonly error = this.errorState.asReadonly();
  constructor() { inject(DestroyRef).onDestroy(() => this.loadSubscription?.unsubscribe()); }

  getAll(place?: string): Observable<Conference[]> {
    const params = place ? new HttpParams().set('place', place) : new HttpParams();
    return this.http.get<Conference[]>(this.url, { params }).pipe(catchError(error => this.failure(error)));
  }
  getById(id: number): Observable<Conference> {
    return this.http.get<Conference>(`${this.url}/${id}`).pipe(catchError(error => this.failure(error)));
  }
  load(): void {
    this.loadSubscription?.unsubscribe();
    this.loadingState.set(true); this.errorState.set(null);
    this.loadSubscription = this.getAll().pipe(finalize(() => this.loadingState.set(false))).subscribe({
      next: data => this.state.set(data),
      error: error => this.errorState.set(error.message),
    });
  }
  create(draft: ConferenceDraft): Observable<Conference> {
    return this.mutate(() => this.http.post<Conference>(this.url, draft),
      created => this.state.update(items => [...items, created]));
  }
  update(conference: Conference): Observable<Conference> {
    return this.mutate(() => this.http.put<Conference>(`${this.url}/${conference.id}`, conference),
      updated => this.replace(updated));
  }
  updatePlaces(id: number, nbPlaces: number): Observable<Conference> {
    if (!Number.isInteger(nbPlaces) || nbPlaces < 0) return throwError(() => new Error('Nombre de places invalide'));
    return this.mutate(() => this.http.patch<Conference>(`${this.url}/${id}`, { nbPlaces }), updated => this.replace(updated));
  }
  remove(id: number): Observable<void> {
    return this.mutate(() => this.http.delete<void>(`${this.url}/${id}`),
      () => this.state.update(items => items.filter(c => c.id !== id)));
  }
  private replace(updated: Conference): void {
    this.state.update(items => items.map(c => c.id === updated.id ? updated : c));
  }
  private mutate<T>(request: () => Observable<T>, success: (value: T) => void): Observable<T> {
    return defer(() => {
      if (this.saving()) return throwError(() => new Error('Une modification est déjà en cours.'));
      this.savingState.set(true); this.errorState.set(null);
      return request().pipe(tap(success), catchError(error => {
        const message = this.message(error); this.errorState.set(message);
        return throwError(() => new Error(message));
      }), finalize(() => this.savingState.set(false)));
    });
  }
  private failure(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(this.message(error)));
  }
  private message(error: HttpErrorResponse): string {
    return error.status === 0 ? 'Serveur injoignable. Lancez npm run api.'
      : error.status === 404 ? 'Conférence introuvable.'
      : `Erreur serveur (${error.status}). Réessayez.`;
  }
}
