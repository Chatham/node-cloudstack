# cloudstack

`cloudstack` is a minimalistic wrapper for the CloudStack API in Node.js.

## Build Status

[![Build Status](https://secure.travis-ci.org/Chatham/node-cloudstack.png?branch=master)](http://travis-ci.org/Chatham/node-cloudstack)

## Usage

```javascript
var cloudstack = new (require('./cloudstack'))({
	apiUri: config.api_uri, // overrides process.env.CLOUDSTACK_API_URI
	apiKey: config.api_key, // overrides process.env.CLOUDSTACK_API_KEY
	apiSecret: config.api_secret // overrides process.env.CLOUDSTACK_API_SECRET
});

cloudstack.exec('listVirtualMachines', {}, function(error, result) {
	console.log(result);
});
```

## License

(The MIT License)

Copyright (c) 2012 Chatham Financial Corp <oss@chathamfinancial.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.