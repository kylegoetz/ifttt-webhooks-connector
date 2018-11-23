# ifttt-webhooks-connector

This library abstracts away firing an IFTTT webhooks recipe. If you have an event called `my-event` and you need to pass `value1` and `value2` to the event (assume your Webhooks maker key is `FOO`), you use this library as such:

    import { IFTTTConnector } from 'ifttt-webhooks-connector'
    const conn = new IFTTTConnector('my-event', 'FOO')
    const payload = conn.generatePayload({ value1, value2 })
    conn.send(payload)