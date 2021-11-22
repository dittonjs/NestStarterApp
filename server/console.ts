import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as repl from 'repl';
import * as Logger from 'purdy';

const LOGGER_OPTIONS = {
  indent: 2,
  depth: 1,
};

class InteractiveNestJS {
  async run() {
    // create the application context
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const targetModule = require(`${__dirname}/app.module`);
    const applicationContext = await NestFactory.createApplicationContext(
      // tslint:disable-next-line: no-string-literal
      targetModule['AppModule'],
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const awaitOutside = require('await-outside');
    // start node repl
    const server = repl.start({
      useColors: true,
      prompt: '> ',
      writer: replWriter,
      ignoreUndefined: true,
    });
    server.context.app = applicationContext;
    awaitOutside.addAwaitOutsideToReplServer(server);
  }
}

function replWriter(value: any): string {
  return Logger.stringify(value, LOGGER_OPTIONS);
}

const session = new InteractiveNestJS();
session.run();
