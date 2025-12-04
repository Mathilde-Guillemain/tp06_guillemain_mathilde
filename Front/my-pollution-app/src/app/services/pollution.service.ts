import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Pollution } from '../models/pollution.model';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {
  private apiUrl = 'https://apitemplate-latest-ahqi.onrender.com/api/pollution';

  constructor(private http: HttpClient) {}

  getPollutions(): Observable<Pollution[]> {
    return this.http.get<Pollution[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('Erreur lors du chargement des pollutions', err);
        return throwError(() => new Error('Impossible de charger les pollutions'));
      })
    );
  }

  getOne(id: number): Observable<Pollution> {
    return this.http.get<Pollution>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error(`Erreur lors du chargement de la pollution ${id}`, err);
        return throwError(() => new Error('Pollution introuvable'));
      })
    );
  }

  addPollution(pollution: Pollution): Observable<Pollution> {
    return this.http.post<Pollution>(this.apiUrl, pollution).pipe(
      catchError(err => {
        console.error('Erreur lors de l’ajout de la pollution', err);
        return throwError(() => new Error('Impossible d’ajouter la pollution'));
      })
    );
  }

  updatePollution(id: number, updated: Pollution): Observable<Pollution> {
    return this.http.put<Pollution>(`${this.apiUrl}/${id}`, updated).pipe(
      catchError(err => {
        console.error(`Erreur lors de la mise à jour de la pollution ${id}`, err);
        return throwError(() => new Error('Impossible de modifier la pollution'));
      })
    );
  }

  deletePollution(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error(`Erreur lors de la suppression de la pollution ${id}`, err);
        return throwError(() => new Error('Impossible de supprimer la pollution'));
      })
    );
  }
}
