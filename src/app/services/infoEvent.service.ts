import { Injectable } from "@angular/core";
import { Events } from "../model/Events";

@Injectable({
    providedIn: 'root'
  })
export class InfoEventService {
    private event!: Events;
    private state!: boolean;

    setState(state:boolean) {
        this.state = state;
    }

    getState() {
        return this.state;
    }

    setEvent(event:Events) {
        this.event = event;
    }

    getEvent() {
        return this.event;
    }
}
