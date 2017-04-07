import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { appRoutes } from './routes'
import { ToastrService } from './common/toastr.service'
import { NavBarComponent } from './nav/navbar.component'
import { Error404Component } from './errors/404.component'
import { EventsAppComponent } from './events-app.component'

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver
} from './events/index'

@NgModule({
    imports: [BrowserModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component
    ],
    providers: [
        EventService,
        ToastrService,
        EventRouteActivator,
        EventListResolver,
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        }
    ],
    bootstrap: [EventsAppComponent]
})

export class AppModule { }

function checkDirtyState(component: CreateEventComponent): boolean {
    if (component.isDirty)
        return window.confirm('You have not saved this event, do you really want to cancel?')
    return true
}