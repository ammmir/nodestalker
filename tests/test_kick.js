var assert = require('assert');
var bs = require('../lib/beanstalk_client');

console.log('testing kick');

var client = bs.Client();

var success = false;
var error = false;

client.kick(10).onSuccess(function(data) {
	console.log(data);
	assert.ok(data);
	assert.equal(typeof data, 'object');
	success = true;
	client.disconnect();
});

client.addListener('error', function() {
	error = true;
});

process.addListener('exit', function() {
	assert.ok(!error);
	assert.ok(success);
	console.log('test passed');
});