const PCBash = require('../src/PCBash.js');

describe('test removeDirectoryFromMachine', () => {
	it('should block removing machine with no path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeDirectoryFromMachine();
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with null path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeDirectoryFromMachine(null);
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with empty string path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeDirectoryFromMachine('');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with / path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeDirectoryFromMachine('/');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with /root path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeDirectoryFromMachine('/root');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with -f path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeDirectoryFromMachine('-f /root/my/secret/path');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with --force path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeDirectoryFromMachine('--force /root/my/secret/path');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with -r path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeDirectoryFromMachine('-r /root/my/secret/path');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with -R path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeDirectoryFromMachine('-R /root/my/secret/path');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with --recursive path', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeDirectoryFromMachine('--recursive /root/my/secret/path');
		} catch (e) {
			expect(e.message).toBe('Invalid path parameter');
		}
	});

	it('should block removing machine with missing bladeId', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeDirectoryFromMachine('/my/valid/path');
		} catch (e) {
			expect(e.message).toBe('Missing bladeId parameter');
		}
	});

	it('should block removing machine with \'\' bladeId', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeDirectoryFromMachine('/my/valid/path', '');
		} catch (e) {
			expect(e.message).toBe('Missing bladeId parameter');
		}
	});

	it('should block removing machine with null bladeId', async () => {
		expect.assertions(1);

		try {
			await PCBash.removeDirectoryFromMachine('/my/valid/path', null);
		} catch (e) {
			expect(e.message).toBe('Missing bladeId parameter');
		}
	});
});
