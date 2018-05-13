import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../environments/environment';

@Injectable()
export class WebsocketService {

    // Our socket connection
    private socket;
    isConnected: Subject<boolean>;
    messageSubject: Subject<any>;

    constructor() {
        this.messageSubject = <Subject<any>>this.connect()
            .map((response: any): any => {
                return response;
            });
        this.isConnected = new Subject();
    }

    connect(): Subject<MessageEvent> {
        // If you aren't familiar with environment variables then
        // you can hard code `environment.ws_url` as `http://localhost:5000`
        this.socket = io(environment.url);
        // We define our observable which will observe any incoming messages
        // from our socket.io server.
        this.socket.on('connect_error', () => this.isConnected.next(false));
        this.socket.on('connect', () => this.isConnected.next(true));
        const observable = new Observable(observed => {
            this.socket.on('message', (data: { message: String, timestamp: Date }) => {
                console.log(`Received message from Websocket Server\n [${new Date(data.timestamp).toISOString()}]`);
                observed.next(data);
            });
            return () => {
                this.socket.disconnect();
                this.isConnected.next(false);
            };
        });

        // We define our Observer which will listen to messages
        // from our other components and send messages back to our
        // socket server whenever the `next()` method is called.
        const observer = {
            next: (response: String) => {
                this.socket.emit('message', response);
            },
        };

        // we return our Rx.Subject which is a combination
        // of both an observer and observable.
        return Subject.create(observer, observable);
    }

    confirmMessage() {
        this.messageSubject.next('Roger that');
    }

}
