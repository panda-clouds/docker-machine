const PCBash = require('../src/PCBash.js');

describe('test putStringInFileOnMachine', () => {
	it('should block removing machine with no parameters', async () => {
		expect.assertions(1);

		try {
			await PCBash.putStringInFileOnMachine();
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block with null path', async () => {
		expect.assertions(1);

		try {
			await PCBash.putStringInFileOnMachine(null, null);
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block with empty path', async () => {
		expect.assertions(1);

		try {
			await PCBash.putStringInFileOnMachine(null, '');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block with null bladeId', async () => {
		expect.assertions(1);

		try {
			await PCBash.putStringInFileOnMachine(null, 'hi', null);
		} catch (e) {
			expect(e.message).toBe('Missing bladeId parameter');
		}
	});

	it('should block with empty bladeId', async () => {
		expect.assertions(1);

		try {
			await PCBash.putStringInFileOnMachine(null, 'hi', '');
		} catch (e) {
			expect(e.message).toBe('Missing bladeId parameter');
		}
	});
});
