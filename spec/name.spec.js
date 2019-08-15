
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
});
