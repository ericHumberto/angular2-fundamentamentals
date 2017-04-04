import { Component } from '@angular/core'

@Component({
    selector: 'events-list',
    template: `
                <div>
                    <h1>Upcoming Angular 2 Events</h1>
                    <hr />
                    <event-thumbnail (eventClick)="handleEventClicked($event)" [event]="event"></event-thumbnail>    
                </div>
            `
})
export class EventsListComponent {
    event = {
        id: 1,
        name: 'Angular Connect',
        date: '9/26/2039',
        time: '10:00 am',
        price: 599.99,
        imageUrl: '/app/assets/images/angularconnect-shield.png',
        location: {
            address: '1057 DT',
            city: 'London',
            country: 'England'
        }
    }

    handleEventClicked(data) {
        console.log('received:', this.event.name);
    }
}