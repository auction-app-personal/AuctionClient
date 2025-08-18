import { Observable, of } from 'rxjs';
import { CrudService } from './crud-service.interface';

export abstract class LocalStorageService<T extends { id: number }> implements CrudService<T>{
  protected items: T[] = [];

  constructor(private storageKey: string, private defaultData: T[] = []) {
    let stored = null;
    if (typeof window !== 'undefined' && window.localStorage){
      stored = localStorage.getItem(this.storageKey);
    }

    if (stored) {
      this.items = JSON.parse(stored);
    } else {
      this.items = [...this.defaultData];
      this.saveToStorage();
    }     

  }

  protected saveToStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    }
  }

  getAll(): Observable<T[]> {
    return of(this.items);
  }

  getById(id: number): Observable<T | null> {
    return of(this.items.find((item) => item.id === id) || null);
  }

  create(item: T): Observable<T> {
    const newId = this.items.length
      ? Math.max(...this.items.map((a) => a.id)) + 1
      : 1;
    item.id = newId;
    this.items.push(item);
    this.saveToStorage();
    return of(item);
  }

  update(id: number, item: T): Observable<T> {
    const existing = this.items.find((i) => i.id === id);
    if (!existing) return of();
    Object.assign(existing, item);
    this.saveToStorage();
    return of(existing);
  }

  save(item: T): Observable<T> {
    return item.id ? (this.update(item.id, item) as Observable<T>) : this.create(item);
  }

  delete(id: number): Observable<void> {
    this.items = this.items.filter((i) => i.id !== id);
    this.saveToStorage();
    return of();
  }
}
