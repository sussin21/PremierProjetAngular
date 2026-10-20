import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { Conferance } from '../services/conferance';
export function nonBlank(control: AbstractControl): ValidationErrors | null {
  return typeof control.value === 'string' && !control.value.trim() ? { blank: true } : null;
}
@Component({ selector: 'app-conference-form', imports: [ReactiveFormsModule, RouterLink], templateUrl: './conference-form.html' })
export class ConferenceForm {
  private readonly fb = inject(FormBuilder);
  readonly service = inject(Conferance);
  private readonly router = inject(Router);
  readonly id = input<string>();
  readonly notFound = signal(false);
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3), nonBlank]],
    description: ['', [Validators.required, Validators.minLength(10), nonBlank]],
    logistics: this.fb.nonNullable.group({
      date: ['', Validators.required],
      place: ['', [Validators.required, nonBlank]],
    }),
    price: [0, [Validators.required, Validators.min(0)]],
    nbPlaces: [1, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
  });
  readonly formValue = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });
  readonly formStatus = toSignal(this.form.statusChanges, { initialValue: this.form.status });
  readonly isValid = computed(() => this.formStatus() === 'VALID');
  readonly nameLength = computed(() => this.formValue().name?.length ?? 0);
  constructor() {
    effect(() => {
      const id = this.id();
      const conf = id ? this.service.getById(Number(id)) : undefined;
      this.notFound.set(!!id && !conf);
      if (conf) this.form.reset({ ...conf, logistics: { date: conf.date, place: conf.place } });
    });
  }
  submit() {
    if (this.form.invalid || this.notFound()) { this.form.markAllAsTouched(); return; }
    const value = this.form.getRawValue();
    const draft = { name: value.name.trim(), description: value.description.trim(),
      date: value.logistics.date, place: value.logistics.place.trim(), price: value.price, nbPlaces: value.nbPlaces };
    if (this.id()) this.service.update({ ...draft, id: Number(this.id()) });
    else this.service.create(draft);
    this.router.navigate(['/conferences/list']);
  }
}
