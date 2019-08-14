const execa = require('execa');
const kMissingProviderError = 'Please pass a provider';
const kMachineNotFound = 'Machine Not Found';

class DockerMachine {
	constructor(name) {
		if (!name) {
			this.machineName = randomString(10);
		} else {
			this.machineName = name;
		}
	}

	static async create(name, provider, options) {
		if (!provider) {
			throw new Error(kMissingProviderError);
		}

		let command = 'docker-machine create --driver ' + provider + ' ';

		for (const p in options) {
			if (options.hasOwnProperty(p)) {
				command += '--' + p + '=' + options[p] + ' ';
			}
		}
		command += name + '\n';

		await DockerMachine.run(command);

		return new DockerMachine(name);
	}

	static async ls() {
		const results = await DockerMachine.run('docker-machine ls --format "{\\"name\\":\\"{{.Name}}\\",\\"active\\":\\"{{.Active}}\\",\\"activeHost\\":\\"{{.ActiveHost}}\\",\\"activeSwarm\\":\\"{{.ActiveSwarm}}\\",\\"driverName\\":\\"{{.DriverName}}\\",\\"state\\":\\"{{.State}}\\",\\"url\\":\\"{{.URL}}\\",\\"swarm\\":\\"{{.Swarm}}\\",\\"error\\":\\"{{.Error}}\\",\\"dockerVersion\\":\\"{{.DockerVersion}}\\",\\"responseTime\\":\\"{{.ResponseTime}}\\"}END_OF_OBJECT"');
		const allRaw = results.split('END_OF_OBJECT');
		const all = [];

		if (allRaw && allRaw.length > 0) {
			for (let i = allRaw.length - 1; i >= 0; i--) {
				const one = allRaw[i];

				if (one && one.length > 1) {
					all.push(JSON.parse(one));
				}
			}

			return all;
		}

		return [];
	}

	static async lsPretty() {
		const results = await DockerMachine.run('docker-machine ls --format "{\n\\"name\\":\\"{{.Name}}\\",\n\\"active\\":\\"{{.Active}}\\",\n\\"activeHost\\":\\"{{.ActiveHost}}\\",\n\\"activeSwarm\\":\\"{{.ActiveSwarm}}\\",\n\\"driverName\\":\\"{{.DriverName}}\\",\n\\"state\\":\\"{{.State}}\\",\n\\"url\\":\\"{{.URL}}\\",\n\\"swarm\\":\\"{{.Swarm}}\\",\n\\"error\\":\\"{{.Error}}\\",\n\\"dockerVersion\\":\\"{{.DockerVersion}}\\",\n\\"responseTime\\":\\"{{.ResponseTime}}\\"\n}END_OF_OBJECT"');

		const formatted = '[' + results.split('END_OF_OBJECT').join(',') + ']';
		const formatted2 = formatted.split('},]').join('}]');

		return formatted2;
	}

	async status() {
		try {
			const results = await DockerMachine.run('docker-machine status ' + this.machineName);

			return results;
		} catch (e) {
			return kMachineNotFound;
		}
	}

	async destroy() {
		const results = await DockerMachine.run('docker-machine rm -f ' + this.machineName);

		return results;
	}

	async getIPv4() {
		const results = await DockerMachine.run('docker-machine ip ' + this.machineName);

		return results;
	}

	async getPrivateKey() {
		const results = await DockerMachine.run('cat $(docker-machine inspect --format=\'{{.Driver.SSHKeyPath}}\' ' + this.machineName + ')');

		return results;
	}

	async generateJoinKey() {
		const results = await DockerMachine.run('docker-machine ssh ' + this.machineName + ' ');

		return results;
	}

	static async run(command) {
		const result = await execa.shell(command, { shell: '/bin/bash' });

		if (result.failed) {
			throw new Error(result.stderr);
		}

		return result.stdout;
	}
}

module.exports = DockerMachine;

function randomString(length) {
	const letters = 'abcdefghijklmnopqrstuvwxyz';
	let text = letters.charAt(Math.floor(Math.random() * letters.length));
	const lettersAndNumbers = 'abcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length - 1; i++) {
		text += lettersAndNumbers.charAt(Math.floor(Math.random() * lettersAndNumbers.length));
	}

	return text;
}
