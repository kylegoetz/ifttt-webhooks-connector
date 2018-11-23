import { IFTTTConnector } from "./lib"
import { mocked } from 'ts-jest/utils';
import * as request from 'request';
import { IFTTTPayload } from "./lib";

jest.mock('request');
const mockedRequest = mocked(request, true);

beforeEach(() => {
  // mockedRequest.mockClear();
});

describe("Base test", () => {
  it("IFTTTConnector is instantiable", () => {
    expect(new IFTTTConnector('foo', 'bar')).toBeInstanceOf(IFTTTConnector);
  })

  it('sets props', () => {
    const c = new IFTTTConnector('foo', 'bar');
    expect(c.webhooksEventName).toBe('foo');
    expect(c.webhooksMakerKey).toBe('bar');
  })
})

describe('IFTTTConnector methods', () => {
  var connector : IFTTTConnector;
  var payload: IFTTTPayload;

  beforeEach(() => {
    connector = new IFTTTConnector('foo', 'bar');
    payload = {
      url: 'foo',
      headers: {'Content-Type': 'application/json'},
      json: {}
    };
  });

  it('sets URL', () => {
    const payload = connector.generatePayload({});
    expect(payload.url).toBe('https://maker.ifttt.com/trigger/foo/with/key/bar');
  })

  it("generates payload", () => {
    const json = {value1: 'foobar'};
    const payload = connector.generatePayload(json);
    expect(payload).toEqual({
      url: 'https://maker.ifttt.com/trigger/foo/with/key/bar',
      headers: {'Content-Type': 'application/json'},
      json});
  })

  it('sends payload', () => {
    connector.send(payload);
    expect(mockedRequest.post.mock.calls[0][0]).toBe(payload);
  });

  it('calls callback', async () => {
    const p = connector.send(payload);
    mockedRequest.post.mock.calls[0][1](null, 'foo', 'bar');
    expect(p).resolves.toEqual({res: 'foo', body: 'bar'});
  })

  it('handles error', async () => {
    const p = connector.send(payload);
    mockedRequest.post.mock.calls[0][1](new Error('FOO'), 'foo', 'bar');
    expect(p).rejects.toEqual('FOO');
  })
})