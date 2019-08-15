const PCBash = require('../src/PCBash.js');

describe('test PCBash.run', () => {
	it('should handle \'pwd\'', async () => {
		expect.assertions(2);
		const command = 'pwd';
		const result = await PCBash.run(command);

		expect(result).toBeDefined();
		expect(result[0]).toBe('/');
	});

	it('should handle \'echo\'', async () => {
		expect.assertions(2);
		const command = 'echo "my dog skip"';
		const result = await PCBash.run(command);

		expect(result).toBeDefined();
		expect(result).toBe('my dog skip');
	});
});

describe('test PCBash.putStringInFile', () => {
	it('should handle numbers', async () => {
		expect.assertions(7);
		const path = '/tmp/spec-PCBash-putStringInFile-numbers';
		const contents = '1234567890.';
		const result = await PCBash.putStringInFile(contents, path);

		expect(result).toBe('');
		const command2 = 'cat "' + path + '"';
		const result2 = await PCBash.run(command2);

		expect(result2).toBeDefined();
		expect(result2).toBe(contents);
		expect(path).toContain('/tmp/');

		const command3 = 'rm ' + path;
		const result3 = await PCBash.run(command3);

		expect(result3).toBeDefined();
		expect(result3).toBe('');

		const command4 = 'cat "' + path + '"';

		try {
			await PCBash.run(command4);
			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toContain('No such file or directory');
		}
	});

	it('should wait await', async () => {
		expect.assertions(1);
		const now = new Date();

		await PCBash.run('sleep 3');
		const after = new Date();

		expect((after.getTime() - now.getTime())).toBeGreaterThan(3000);
	});

	it('should handle EOF and new lines', async () => {
		expect.assertions(7);
		const path = '/tmp/spec-PCBash-putStringInFile-EOF-new-lines';
		const contents = 'EOF\nhello World\nEOF';
		const result = await PCBash.putStringInFile(contents, path);

		expect(result).toBe('');
		const command2 = 'cat "' + path + '"';
		const result2 = await PCBash.run(command2);

		expect(result2).toBeDefined();
		expect(result2).toBe(contents);
		expect(path).toContain('/tmp/');

		const command3 = 'rm ' + path;
		const result3 = await PCBash.run(command3);

		expect(result3).toBeDefined();
		expect(result3).toBe('');

		const command4 = 'cat "' + path + '"';

		try {
			await PCBash.run(command4);
			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toContain('No such file or directory');
		}
	});

	it('should handle a js object and input as JSON', async () => {
		expect.assertions(7);
		const path = '/tmp/spec-PCBash-putStringInFile-EOF-new-lines';
		const contents = {};

		contents.keyString = 'value';
		contents.keyNumber = 5;
		contents.keyDate = new Date();
		contents.keyNull = null;
		const array = [];

		array.push('hi');
		array.push(1);
		array.push(new Date());
		array.push(null);
		contents.arrayKey = array;
		const subDic = {};

		subDic.subKeyString = 'hi';
		subDic.subKeyNumber = 5;
		subDic.subKeyDate = new Date();
		subDic.subKeyNull = null;
		contents.subDic = subDic;
		const contentCheck = JSON.stringify(contents);
		const result = await PCBash.putStringInFile(contents, path);

		expect(result).toBe('');
		const command2 = 'cat "' + path + '"';
		const result2 = await PCBash.run(command2);

		expect(result2).toBeDefined();
		expect(result2).toBe(contentCheck);
		expect(path).toContain('/tmp/');

		const command3 = 'rm ' + path;
		const result3 = await PCBash.run(command3);

		expect(result3).toBeDefined();
		expect(result3).toBe('');

		const command4 = 'cat "' + path + '"';

		try {
			await PCBash.run(command4);
			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toContain('No such file or directory');
		}
	});
});

