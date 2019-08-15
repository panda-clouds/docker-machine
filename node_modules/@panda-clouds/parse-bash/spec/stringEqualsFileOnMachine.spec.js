const PCBash = require('../src/PCBash.js');

describe('test stringEqualsFileOnMachine', () => {
	it('should block with missing bladeId', async () => {
		expect.assertions(1);

		try {
			await PCBash.stringEqualsFileOnMachine('/my/valid/path');
		} catch (e) {
			expect(e.message).toBe('Missing bladeId parameter');
		}
	});

	it('should block with \'\' bladeId', async () => {
		expect.assertions(1);

		try {
			await PCBash.stringEqualsFileOnMachine('/my/valid/path', '');
		} catch (e) {
			expect(e.message).toBe('Missing bladeId parameter');
		}
	});

	it('should block with null bladeId', async () => {
		expect.assertions(1);

		try {
			await PCBash.stringEqualsFileOnMachine('/my/valid/path', null);
		} catch (e) {
			expect(e.message).toBe('Missing bladeId parameter');
		}
	});
});
