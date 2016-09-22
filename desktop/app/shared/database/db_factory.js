const { ipcRenderer: ipc } = require('electron');
const parse = require('./app/shared/database/parse');
const crypto = require('crypto');
const Datastore = require('nedb');
const db = new Datastore({
  filename: `${__dirname}/tasks.db`,
  afterSerialization: (object) => {
    const cipher = crypto.createCipher('aes256', 'sample-key');
    return (cipher.update(object, 'utf8', 'hex') + cipher.final('hex'));
  },
  beforeDeserialization: (object) => {
    const decipher = crypto.createDecipher('aes256', 'sample-key');
    return (decipher.update(object, 'hex', 'utf8') + decipher.final('utf8'));
  },
  autoload: true,
});

/**
 * Get a query, parse it and add it to
 * database
 * @param {string} query task query
 */
function insert(query) {
  const taskObj = parse(query);
  db.insert(taskObj, (err) => {
    if (err) {
      ipc.send('insert-error', err);
    }
  });
}

/**
 * Find appropriate tasks based on type
 * @param  {string}   type Determines type of task
 *                         to be found
 * @param  {Function} cb   callback
 * @return {[type]}        List of all found tasks
 */
function find(type, cb) {
  const now = Date.now();
  switch (type) {
  case 'open':
    db.find({
      $and: [{ start: { $lt: now } },
            { end: { $gt: now } },
          ],
    }, { text: 1, _id: 0 },
        (err, tasks) => {
          cb(Object.keys(tasks).map(key => tasks[key].text));
        });
    break;
  default:
  }
}

angular.module('MainApp')
  .factory('db', () => {
    const dbRet = {
      insert,
      find,
    };
    return dbRet;
  });