const WebSocket = require('ws');
const { WebsocketProvider } = require('y-websocket');
const Y = require('yjs');

const numClients = 10; 
const docName = 'example-document';
const url = 'ws://sprig.hackclub.com/~/beta/oXsxZroUntiRL9h7qo0I'; 


const simulateClients = (numClients, docName, url) => {
    for (let i = 0; i < numClients; i++) {
        const doc = new Y.Doc();
        const wsProvider = new WebsocketProvider(url, docName, doc, { WebSocketPolyfill: WebSocket });

        wsProvider.on('status', (event) => {
            console.log(`Client ${i} connection status: ${event.status}`);
        });

        doc.on('update', (update) => {
            console.log(`Client ${i} received update: ${update}`);
        });
    }
};


simulateClients(numClients, docName, serverUrl);
