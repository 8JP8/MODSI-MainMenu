export default {
	// Generate a random salt in base64
	generateSalt: () => {
		// Use forge to generate random bytes
		const bytes = forge.random.getBytesSync(16);
		return forge.util.encode64(bytes);
	},

	getSaltAndHash: async (password, generate_salt) => {
		let salt = '';
		if (generate_salt)
		{ salt = this.generateSalt()}
		else
		{ 
			let response = await GetSaltForHashing.run();
			salt = response.Salt;
		}
		const pass = await this.hashPassword(password, salt);
		storeValue('hashedPassword', pass);
		storeValue('salt', salt);
	},

	hashPassword(password, salt) {
		const combined = password + salt;
		const md = forge.md.sha256.create();
		md.update(combined);
		const hash = md.digest().bytes();
		const hashBase64 = forge.util.encode64(hash);
		return hashBase64;
	},

	// Verify if the generated hash matches the stored hash
	verifyHash: async (password, salt, hash) => {
		// Can't use 'this' in arrow functions, need to reference the object directly
		const generatedHash = await this.hashPassword(password, salt);
		return generatedHash === hash;
	},
}