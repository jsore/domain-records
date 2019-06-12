#!/usr/bin/env node

/**
 * domain-records/index.js
 *
 * entry point for a DNS and Whois query-er, just a POC for now
 *
 * 1. clone or DL and unzip the project, move into it
 *
 *   $ git clone https://github.com/jsore/ THIS NEEDS TO BE UPDATED.git
 *   $ cd domain-records
 *
 * 2. init dependencies
 *
 *   $ npm install
 *
 * 3. run
 *
 *   $ node index.js <command> <options>
 *   $ node index.js run-dns google.com
 *   $ node index.js run-whois archive.org
 *
 * 3b. make this executable, optionally link binary for global execution
 *
 *   $ chmod +x index.js
 *   $ sudo npm link    # grants access to commands globally
 */

'use strict';
const yargs = require('yargs');       // parses CLI arguments
const path = require('path');         // sane paths
const query = require('./query.js');  // bring in my module
const source = process.cwd();         // get dir command originated from
const dataFile = path.resolve(__dirname, '/response.txt');
const _ = require('lodash');

/** set CLI usage */
const argv = yargs
  .command('run-dns', 'Query DNS records', {
    a: {
      alias: 'address',
      describe: 'Resolve an address and reverse search returned records',
      demandOption: true,
    },
    p: {
      alias: 'print',
      describe: 'Print responses to console (default)',
    },
    e: {
      alias: 'endpoint',
      describe: 'Pipe responses to a listening endpoint',
    },
    f: {
      alias: 'file',
      describe: 'Pipe responses to a txt file'
    }
  })
  .command('run-whois', 'Run a Whois search', {
    a: {
      alias: 'address',
      describe: 'Address to query',
      demandOption: true,
    },
    p: {
      alias: 'print',
      describe: 'Print responses to console (default)',
    },
    e: {
      alias: 'endpoint',
      describe: 'Pipe responses to a listening endpoint',
    },
    f: {
      alias: 'file',
      describe: 'Pipe responses to a txt file'
    }
  })
  .demandCommand(1, 'Use --help for guidance')
  .help('help', 'Show usage information')
  .example('$0 --help')
  /** call home to wrap up yargs storage into argv */
  .argv;

const command = argv._[0];

if (command === 'run-dns') {
  try {
    // let queryReply = query
    //   .dnsRecords(argv, source, data)
    //   //.then((queryReply) => {
    //   .then(() => {
    //     console.log('response logged');
    //   }).catch(err => console.log(err));
    let queryReply = query
      .dnsRecords(argv, source, dataFile);
  }
  catch (e) { console.log('exec error: ' + e); }
}

if (command === 'run-whois') {
  try {
    let queryReply = query
      .whoisRecords(argv, source, dataFile)
      .then((queryReply) => {
        console.log(queryReply);
      }).catch(err => console.log(err));
  } catch (e) { console.log('exec error: ' + e); }
}
