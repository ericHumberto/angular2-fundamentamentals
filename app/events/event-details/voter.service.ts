import { Injectable } from '@angular/core';
import { ISession } from '../shared/event.model';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/RX';

@Injectable()
export class VoterService {

    constructor(private http: Http) { }

    deleteVoter(eventId: number, session: ISession, voterName: string) {
        session.voters = session.voters.filter(voter => voter !== voterName);
        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;

        this.http.delete(url).catch(this.handleError).subscribe();
    }

    addVoter(eventId: number, session: ISession, voterName: string) {
        session.voters.push(voterName);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;

        this.http.post(url, JSON.stringify({}), options).catch(this.handleError).subscribe();
    }

    userHasVoted(session: ISession, voterName: string) {
        return session.voters.some(q => q === voterName);
    }

    handleError(response: Response) {
        return Observable.throw(response.statusText);
    }
}