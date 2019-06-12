import https from 'https';
import url from 'url';
import { certificateFor } from 'devcert';
import next from 'next';

type InferPromise<T> = T extends Promise<infer U> ? U : never;
type SslOptions = InferPromise<ReturnType<typeof certificateFor>>;

async function bootstrap() {
  const port = parseInt(process.env.PORT || '3000', 10);
  const dev = process.env.NODE_ENV !== 'production';

  const ssl: SslOptions | {} = dev ? await certificateFor('localhost') : {};

  // @ts-ignore
  const app = next({ dev });
  const handle = app.getRequestHandler();

  await app.prepare();

  https
    .createServer({ ...ssl }, (req, res) => {
      const parsedUrl = url.parse(req.url!, true);
      handle(req, res, parsedUrl);
    })
    .listen(port);

  // tslint:disable-next-line:no-console
  console.log(
    `🚀 Server listening at https://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  );
}

bootstrap().catch(err => console.error('An error occurred', err));
