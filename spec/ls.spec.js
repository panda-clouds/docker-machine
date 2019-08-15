
const DockerMachine = require('../src/PCDockerMachine.js');

try {
	require('../apiKeys.js')();
} catch (e) {
	// It's ok if we don't load the keys from the apiKeys file
	// In CI we load directly
}

describe('test docker machine', () => {
	it('should list  machines', async () => {
		expect.assertions(17);

		const options = {};

		options['digitalocean-access-token'] = process.env.DIGITAL_OCEAN_TOKEN;

		// Zero Machines
		const result = await DockerMachine.ls();

		expect(typeof result).toBe('object');

		const stringResult = await DockerMachine.lsPretty();

		expect(typeof stringResult).toBe('string');
		// End Zero Machines
		// One Machine
		const machine = await DockerMachine.create('overwatch-test-ls-1', 'digitalocean', options);
		const status1 = await machine.status();

		expect(status1).toBe('Running');

		const result2 = await DockerMachine.ls();

		expect(typeof result2).toBe('object');

		expect(result2.length > 0).toBe(true);

		// const only1A = result2.filter(mach => {
		// 	console.log('only1A ' + mach.name);
		// 	console.log('firstss ' + JSON.stringify(mach[0]));

		// 	return mach.name === 'overwatch-test-ls-1';
		// });

		// console.log('only1A ' + JSON.stringify(only1A));

		const only1A = result2.filter(mach => (mach.name === 'overwatch-test-ls-1'));

		expect(only1A).toHaveLength(1);
		expect(only1A[0].name).toBe('overwatch-test-ls-1');

		const stringResult2 = await DockerMachine.lsPretty();

		expect(typeof stringResult2).toBe('string');
		// End One Machine
		// Two Machines
		const machine2 = await DockerMachine.create('overwatch-test-ls-2', 'digitalocean', options);
		const status2 = await machine2.status();

		expect(status2).toBe('Running');

		const result3 = await DockerMachine.ls();

		expect(typeof result3).toBe('object');

		const only1B = result3.filter(mach => (mach.name === 'overwatch-test-ls-1'));

		expect(only1B).toHaveLength(1);
		expect(only1B[0].name).toBe('overwatch-test-ls-1');

		const only1C = result3.filter(mach => (mach.name === 'overwatch-test-ls-2'));

		expect(only1C).toHaveLength(1);
		expect(only1C[0].name).toBe('overwatch-test-ls-2');

		const stringResult3 = await DockerMachine.lsPretty();

		expect(typeof stringResult3).toBe('string');
		// End Two Machines
		// Clean Up
		await machine.destroy();
		const destroyed = await machine.status();

		expect(destroyed).toBe('Machine Not Found');

		await machine2.destroy();
		const destroyed2 = await machine2.status();

		expect(destroyed2).toBe('Machine Not Found');
		// End Clean Up
	}, 10 * 60 * 1000);
});
