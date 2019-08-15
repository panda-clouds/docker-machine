
const execa = require('execa');

class PCBash {
	constructor() {
		// Empty Constructor
	}
	static async putStringInFile(inputFile, path) {
		// stringify anything that isn't already a string
		let file = inputFile;

		if (typeof file !== 'string') {
			file = JSON.stringify(file);
		}

		const fullCommand = 'cat <<\'EOFSSHFILE\' > ' + path + '\n' + file + '\nEOFSSHFILE\n';

		const results = await PCBash.run(fullCommand);

		return results;
	}

	static async run(command) {
		try {
			const result = await execa(command, { shell: '/bin/bash' });

			return result.stdout;
		} catch (e) {
			throw new Error(e.stderr);
		}
	}

	// docker-machine functions
	static async runInMachine(command, bladeId) {
		if (!bladeId || bladeId === '') {
			throw new Error('Missing bladeId parameter');
		}

		const fullCommand = "cat <<'EOFSSHDEL' | docker-machine ssh " + bladeId + " 'bash'\n" + command + '\nEOFSSHDEL\n';

		const results = await PCBash.run(fullCommand);

		return results;
	}

	static async putStringInFileOnMachine(inputFile, path, bladeId) {
		if (!path || // Block empty variable
			path === ''
		) {
			throw new Error('Invalid path parameter');
		}

		let file = inputFile;

		if (typeof file !== 'string') {
			file = JSON.stringify(file);
		}

		if (!bladeId || bladeId === '') {
			throw new Error('Missing bladeId parameter');
		}

		const echoMktemp = 'echo $(mktemp)';
		const tmpDir = await PCBash.run(echoMktemp);

		// sleep 1 is require because if now we get "lost connection"
		const fullCommand = "cat <<'EOFSSHFILE' > " + tmpDir + '\n' + file + '\nEOFSSHFILE\nsleep 1\ndocker-machine scp ' + tmpDir + ' ' + bladeId + ':' + path + '\nsleep 1\nrm ' + tmpDir;

		const results = await PCBash.run(fullCommand);

		return results;
	}
	static async createDirectoryIfNeeded(path, bladeId) {
		const fullCommand = 'mkdir -p ' + path;

		const results = await PCBash.runInMachine(fullCommand, bladeId);

		return results;
	}

	static async removeDirectoryFromMachine(path, bladeId) {
		// lets stop stupid mistakes here
		if (!path || // Block empty variable
			path === '' || // Block empty string
			path === '/' || // Block removing /
			path === '/root' || // Block removing root
			path.includes('-f') || // Block forcing
			path.includes('--force') || // Block forcing
			path.includes('-r') || // Block double recursive
			path.includes('-R') || // Block double recursive
			path.includes('--recursive') // Block double recursive
		) {
			throw new Error('Invalid path parameter');
		}

		const fullCommand = 'rm -r ' + path;

		const results = await PCBash.runInMachine(fullCommand, bladeId);

		return results;
	}

	static async readFileOnMachine(path, bladeId) {
		const fullCommand = 'cat ' + path;

		try {
			const results = await PCBash.runInMachine(fullCommand, bladeId);

			return results;
		} catch (e) {
			if (e.message.includes('No such file or directory')) {
				return null;
			}

			throw new Error(e.message);
		}
	}

	static async removeFileFromMachine(path, bladeId) {
		// lets stop stupid mistakes here
		if (!path || // Block empty variable
			path === '' || // Block empty string
			path === '/' || // Block removing /
			path === '/root' || // Block removing root
			path.includes('-f') || // Block forcing
			path.includes('--force') || // Block forcing
			path.includes('-r') || // Block recursive
			path.includes('-R') || // Block recursive
			path.includes('--recursive') // Block recursive
		) {
			throw new Error('Invalid path parameter');
		}

		const fullCommand = 'rm ' + path;

		const results = await PCBash.runInMachine(fullCommand, bladeId);

		return results;
	}

	static async stringEqualsFileOnMachine(string, path, bladeId) {
		const fileContents = await PCBash.readFileOnMachine(path, bladeId);

		if (fileContents === string) {
			return true;
		}

		return false;
	}
}


module.exports = PCBash;
