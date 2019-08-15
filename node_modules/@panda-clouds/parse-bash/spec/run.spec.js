const PCBash = require('../src/PCBash.js');

describe('test putStringInFileOnMachine', () => {
	it('should block removing machine with no parameters', async () => {
		expect.assertions(1);

		try {
			await PCBash.run('exit 5');

			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe('');
		}
	});
});
