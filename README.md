# node-cloudstack

`node-cloudstack` is a CloudStack client implementation for Node.js.

## Build Status

[![Build Status](https://secure.travis-ci.org/Chatham/node-cloudstack.png?branch=master)](http://travis-ci.org/Chatham/node-cloudstack)

## Usage

```javascript
var cloudstack = require('node-cloudstack')
  , templateId = 1
  , serviceOfferingId = 1
  , zoneId = 1;

client.deployVirtualMachine(templateId, serviceOfferingId, zoneId, function(result) {
	var virtualMachineId = result.vmid;

	result.emitter.on('success', function() {
		console.log('Machine deployed successfully and it is ready to use!');
	});

	result.emitter.on('fail', function() {
		console.log('Machine failed to deploy.');
	});
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