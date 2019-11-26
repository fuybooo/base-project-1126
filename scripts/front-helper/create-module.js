const createModule = require('./create').createModule
const config = require('./create-config');
(Array.isArray(config) ? config : [ config ]).forEach((item) => createModule(item))
