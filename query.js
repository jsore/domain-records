/**
 * domain-records/query.js
 *
 * workhorse for querying stuff
 */
'use strict';

const dns = require('dns');           // https://nodejs.org/api/dns.html
const whois = require('whois');       // https://www.npmjs.com/package/whois
const path = require('path');
const fs = require('fs');

// const dnsRecords = async (argv, source, data) => {
const dnsRecords = async (argv, source, dataFile) => {
  const address = argv.address;
  const print = argv.print;
  const newDataFile = source + dataFile;
  console.log('sanity checker: dnsRecords');

  // dns.resolve4(address, (err, addresses) => {
  // dns.resolve(address, (err, addresses) => {
  dns.resolveAny(address, (err, addresses) => {
  if (err) throw err;
  //console.log(`addresses: ${JSON.stringify(addresses)}`);
  console.log(addresses);
  /** reverse search */
  // addresses.forEach((a) => {
  //   dns.reverse(a, (err, hostname) => {
  //     if (err) {
  //       throw err;
  //     }
  //     console.log(`reverse for ${a}: ${JSON.stringify(hostname)}`);
  //   });
  // });
});

}

const whoisRecords = async (argv, source, dataFile) => {
  //whois.lookup('google.com', function(err, data) {
  /** spit it out to console */
  //console.log(data);
  console.log('sanity checker: whoisRecords');

  const address = argv.address;

  whois.lookup(address, (err, data) => {
  /** spit it out to console */
  console.log(data);

  /** or dump it in a file in command source */
  // fs.writefylesync(source+dataFile);

  /** or send it to a remote endpoint */
  // use stream modules and send the incoming data event somewhere?
  });
}

module.exports = { dnsRecords, whoisRecords };
