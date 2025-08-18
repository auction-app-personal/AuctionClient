import { Observable } from "rxjs";

export interface CrudService<T> {
    getAll(): Observable<T[]>;
    getById(id: number): Observable<T | null>;
    create(item: T): Observable<T>;
    update(id: number, item: T): Observable<T>;
    delete(id: number): Observable<void>;
    save(item: T): Observable<T>;
}
