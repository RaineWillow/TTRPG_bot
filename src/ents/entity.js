macros = require("./macro.js");
result = require("./../utils/error.js")

class Entity {
	constructor(name) {
		this.name = name;
		this.macros = {};
	}

	createMacro(name, content) {
		if (name in this.macros) {
			return new result.UserResult(false, `There is already a macro with name ${name} in this entity!`);
		} else {
			this.macros = Object.assign(this.macros, {[name]: new macros.Macro(content)});
			return new result.UserResult(true, `The macro ${name} was created successfully!`);
		}
	}

	deleteMacro(name) {
		if (!(name in this.macros)) {
			return new result.UserResult(false, `There is no macro with name ${name} in this entity!`);
		} else {
			delete this.macros[name];
			return new result.UserResult(true, `Macro deleted successfully!`);
		}
	}

	viewMacro(name) {
		if (!(name in this.macros)) {
			return new result.UserResult(false, `There is no macro with name ${name} in this entity!`);
		} else {
			return new result.UserResult(true, this.macros[name].macro);
		}
	}

	editMacro(name, content) {
		if (!(name in this.macros)) {
			return new result.UserResult(false, `There is no macro with name ${name} in this entity!`);
		} else {
			this.macros[name].edit(content);
			return new result.UserResult(true, `Macro ${name} successfully changed to ${this.macros[name].macro}!`);
		}
	}
}

module.exports = {
	Entity:Entity
}
