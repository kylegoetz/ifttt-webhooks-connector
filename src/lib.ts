import { post } from 'es6-request';


export interface IFTTTPayload {
    url: string,
    headers: {
        'Content-Type': string,
    },
    json: object,
}

const IFTTT_BASE_URL = 'https://maker.ifttt.com/trigger';

export class IFTTTConnector {

  constructor(
	  public webhooksEventName: string,
	  public webhooksMakerKey: string) {}

  generatePayload(items: object): IFTTTPayload {
    return {
      url: `${IFTTT_BASE_URL}/${this.webhooksEventName}/with/key/${this.webhooksMakerKey}`,
      headers: {
        'Content-Type': 'application/json',
      },
      json: items,
    };
  }
  /* If this is successful, it will return res of form {
	statusCode: 200,
	statusMessage: 'OK,
	body: 'Congratulations! You've fired the {eventname} event',
	...
  } */
  async send(payload: IFTTTPayload) : Promise<{res: any, body: any}> {
    let body, res;
    try {
      [body, res] = await post(payload.url)
        .headers(payload.headers)
        .sendJSON(payload.json);
    }
    catch (e) {
      throw e;
    }
    if (  res.statusCode !== 200  ) {
      const { statusCode, statusMessage, body } = res;
      throw new Error(statusMessage);
    }
    if (  !body  ) {
      body = '';
    }
    return { res, body };
  }
}
