"use strict";
const dir = require('node-dir');
const parseRDF = require('./lib/parse-rdf');

const dirName = process.argv[2];

const options = {
    match: /\.rdf$/, // match rdf files
    exclude: ['pg0.rdf'] // ignore the template
};

dir.readFiles(dirName, options, (err, content, next) => {
    if (err) throw err;
    const doc = parseRDF(content);
    console.log(JSON.stringify({
        index: {_id: `pq${doc.id}`}
    }));
    console.log(JSON.stringify(doc));
    next();
});