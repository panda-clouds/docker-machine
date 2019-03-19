
PCDockerMachine
=========
maintained by [PandaClouds.com](https://pandaclouds.com)

`PCDockerMachine` provides a clean way to validate data in Parse Sever Cloud Code.


Installation
------------

1. If you want to use this library, you first need to install the [Node.js](https://nodejs.org/en/).

2. When you install node.js, will also be installed [npm](https://www.npmjs.com/).

3. Please run the following command.

```
npm install --save @panda-clouds/docker-machine
```

Usage
-----

### Node.js

```javascript
const PCDockerMachine = require('@panda-clouds/docker-machine');

const options = {};
options['digitalocean-access-token'] = '< my DigitalOcean Token >';

const machine = await DockerMachine.create('machine-test', 'digitalocean', options);

const status = await machine.status() // => 'Running'
const IPv4 = await machine.getIPv4()  // => '123.234.321.21'
const allMachines = await Machine.ls()// => [{'name':'machine-test'...},{'name':'other-machine'...}]

// Destroy the machine 
await machine.destroy();

const status = await machine.status() // => 'Machine Not Found'
```

You can replace PCDockerMachine with any variable.


Methods
-------

[Unit Tests] are an additional resource for learning functionality.

### - status()

returns the status of the machine

Example:

```javascript
const status = await machine.status() // => 'Running'
```



Contributions
-------------

Pull requests are welcome! here is a checklist to speed things up:

- modify `PCDockerMachine.js`
- add unit tests in `PCDockerMachine.spec.js`
- run `npm test`
- document method in `README.md`
- add your name to 'Contributors' in `README.md`


### Contributors

(Add your name)

- [*] [Marc Smith](https://github.com/mrmarcsmith)


[Unit Tests]: https://github.com/panda-clouds/string/blob/master/spec/PCDockerMachine.spec.js
