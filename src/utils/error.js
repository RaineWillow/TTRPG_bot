/*
Error classes for handling various errors.
*/

//returns the result of the operation requested by the user
class UserError {
	constructor(s, m) {
		this.success = s;
		this.message = m;
	}
}

module.exports = {
	UserError: UserError
}
