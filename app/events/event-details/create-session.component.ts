import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ISession } from '../shared/event.model';

@Component({
    selector: 'create-session',
    templateUrl: 'app/events/event-details/create-session.component.html',
    styles: [`
    em { float:right; color:#E05C65; padding-left: 10px; }
    .error input textarea { background-color: #E3C3C5; }
  `]
})

export class CreateSessionComponent implements OnInit {
    @Output() saveNewSession = new EventEmitter();
    @Output() cancelNewSession = new EventEmitter();
    newSessionForm: FormGroup;
    name: FormControl;
    presenter: FormControl;
    duration: FormControl;
    level: FormControl;
    abstract: FormControl;

    constructor() { }

    ngOnInit() {
        this.name = new FormControl('', Validators.required);
        this.presenter = new FormControl('', Validators.required);
        this.duration = new FormControl('', Validators.required);
        this.level = new FormControl('', Validators.required);
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(1), this.restrictedWords(['foo', 'bar'])])

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }

    private restrictedWords(words) {
        return (control: FormControl): { [key: string]: any } => {
            if (!words) return null

            var invalidWords = words
                .map(w => control.value.includes(w) ? w : null)
                .filter(w => w != null);

            return invalidWords && invalidWords.length > 0
                ? { 'restrictedWords': invalidWords.join(', ') }
                : null;
        }
    }

    saveSession(formValues) {
        let session: ISession = {
            id: undefined,
            name: formValues.name,
            duration: +formValues.duration,
            level: formValues.level,
            presenter: formValues.presenter,
            abstract: formValues.abstract,
            voters: []
        }

        this.saveNewSession.emit(session);

        console.log(session);
    }

    cancelAddSession() {
        this.cancelNewSession.emit();
    }
}