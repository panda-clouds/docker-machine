const PCBash = require('../src/PCBash.js');

describe('test removeFileFromMachine', () => {
	it('should block removing machine with no path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeFileFromMachine();
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with null path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeFileFromMachine(null);
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with empty string path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeFileFromMachine('');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with / path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeFileFromMachine('/');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with /root path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeFileFromMachine('/root');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with -f path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeFileFromMachine('-f /root/my/secret/path');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with --force path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeFileFromMachine('--force /root/my/secret/path');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with -r path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeFileFromMachine('-r /root/my/secret/path');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with -R path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeFileFromMachine('-R /root/my/secret/path');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with --recursive path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeFileFromMachine('--recursive /root/my/secret/path');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with missing bladeId', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeFileFromMachine('/my/valid/path');
		} catch (e) {
			expect(e.message).toBe('Missing bladeId parameter');
		}
	});

	it('should block removing machine with \'\' bladeId', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeFileFromMachine('/my/valid/path', '');
		} catch (e) {
			expect(e.message).toBe('Missing bladeId parameter');
		}
	});

	it('should block removing machine with null bladeId', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeFileFromMachine('/my/valid/path', null);
		} catch (e) {
			expect(e.message).toBe('Missing bladeId parameter');
		}
	});
});
