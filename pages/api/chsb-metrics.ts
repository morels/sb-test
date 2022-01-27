// import queryString from 'query-string';

import { IncomingMessage, ServerResponse } from 'http';
import metrics from 'src/metrics/fixtures/metrics.json';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (
  req: IncomingMessage & { query: Record<string, string>; body: Record<string, any> },
  res: ServerResponse & { json: (data: any) => void },
) => {
  const {
    url,
  } = req;


  if (process.env.NODE_ENV === "development") {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    return res.end(JSON.stringify(metrics));
  }
  else {
    const apiPath = url?.replace('/api', '').split('?')[0];
    console.log(`Calling route... ${process.env.NEXT_PUBLIC_API_HOST}${apiPath}`);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${apiPath}`);

    const contentType = response.headers.get('content-type');

    const json = await response.json();
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = response.status;
    return res.end(JSON.stringify(json));
  }
};
