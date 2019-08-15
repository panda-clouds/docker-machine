
const DockerMachine = require('../src/PCDockerMachine.js');

try {
	require('../apiKeys.js')();
} catch (e) {
	// It's ok if we don't load the keys from the apiKeys file
	// In CI we load directly
}

describe('test docker machine', () => {
	it('should autofill a random 10 charater name', () => {
		expect.assertions(1);

		const machine = new DockerMachine();

		expect(machine.machineName).toHaveLength(10);
	});

	it('should fail status without machine', async () => {
		expect.assertions(1);

		const never = new DockerMachine('bla-never-exist');

		const result = await never.status();

		expect(result).toBe('Machine Not Found');
	});

	it('should pass create', async () => {
		expect.assertions(4);
		const options = {};

		options['digitalocean-access-token'] = process.env.DIGITAL_OCEAN_TOKEN;
		const machine = await DockerMachine.create('overwatch-test', 'digitalocean', options);
		const result = await machine.status();

		expect(result).toBe('Running');

		const ipV4 = await machine.getIPv4();

		expect(ipV4).toContain('.');

		const privKey = await machine.getPrivateKey();

		expect(privKey).toContain('-----BEGIN RSA PRIVATE KEY-----');

		await machine.destroy();
		const destroyed = await machine.status();

		expect(destroyed).toBe('Machine Not Found');
	}, 10 * 60 * 1000);
});
