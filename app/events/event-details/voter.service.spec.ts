import { VoterService } from '../';
import { ISession } from '../shared/event.model';
import { Observable } from 'rxjs/RX';
describe('VoterService', () => {
    let voterService: VoterService, mockHttp;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        voterService = new VoterService(mockHttp);
    });

    describe('deleteVoter', () => {
        it('should remove the voter from the list of voters', () => {
            var session = { id: 6, voters: ["joe", "john"], name: 'test', presenter: 'test', duration: 10, level: 'test', abstract: 'test' };

            mockHttp.delete.and.returnValue(Observable.of(false));
            voterService.deleteVoter(6, <ISession>session, 'joe');

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe('john');
        })
    });
})