#!/usr/bin/env node
//
//  index.ts
//  Modern Logic
//
//  Created by Modern Logic on 2022-09-04
//  Copyright © 2022 Modern Logic, LLC. All Rights Reserved.

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { runHandler } from './cli'

const plaformOption: yargs.Options = {
  alias: 'p',
  describe: 'Platform to build and run the app',
  choices: ['ios', 'android'],
  default: 'ios'
}

const configOption: yargs.Options = {
  alias: 'c',
  describe: 'Configuration file to be used',
  type: 'string',
  default: './owl.config.json'
}

const updateOption: yargs.Options = {
  alias: 'u',
  describe: 'Update the baseline screenshots',
  type: 'boolean',
  default: false
}

const limitOption: yargs.Options = {
  alias: 't',
  describe: 'Only run this test',
  type: 'string',
  default: undefined
}

const builderOptionsTest = {
  config: configOption,
  platform: plaformOption,
  update: updateOption,
  limit: limitOption
}

void yargs(hideBin(process.argv))
  .command({
    command: 'test',
    describe: 'Runs the test suite',
    builder: builderOptionsTest,
    handler: async (args: any) => await runHandler(args)
  })
  .help('help')
  .alias('h', 'help')
  .showHelpOnFail(false, 'Specify --help for available options')
  .alias('v', 'version').argv