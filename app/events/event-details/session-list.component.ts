import { VoterService } from './voter.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ISession } from '../shared/event.model';
import { AuthService } from '../../user/auth.service';

@Component({
    selector: 'session-list',
    templateUrl: 'app/events/event-details/session-list.component.html'
})

export class SessionListComponent implements OnInit, OnChanges {
    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    @Input() eventId: number;
    visibleSessions: ISession[];

    constructor(private authService: AuthService, private voterService: VoterService) { }

    ngOnInit() { }

    ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterBy);
            this.sortSessions(this.sortBy);
        }
    }

    filterSessions(filter) {
        if (filter == 'all') {
            this.visibleSessions = this.sessions.slice(0);
        } else {
            this.visibleSessions = this.sessions.filter(z => { return z.level.toLocaleLowerCase() === filter });
        }
    }

    sortSessions(sort) {
        sort === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotes);
    }

    toggleVote(session: ISession) {
        if (this.userHasVoted(session)) {
            this.voterService.deleteVoter(this.eventId, session, this.authService.currentUser.userName);
        } else {
            this.voterService.addVoter(this.eventId, session, this.authService.currentUser.userName);
        }

        if (this.sortBy == 'votes') {
            this.visibleSessions.sort(sortByVotes);
        }
    }

    userHasVoted(session: ISession) {
        return this.voterService.userHasVoted(session, this.authService.currentUser.userName);
    }
}

function sortByVotes(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length;
}

function sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name) return 1;
    else if (s1.name === s2.name) return 0;
    else return -1;
}