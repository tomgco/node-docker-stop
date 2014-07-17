var EventEmitter = require('events').EventEmitter;
var print = require('util').print;

module.exports = function dockerStop(server) {

  function shutdown() {
    print('\n');
    process.exit(0);
  }

  // Server can be anything that follows node's .close(), emit('close') paradigm.
  function onSignal(sig) {
    print('\n' + sig, ' received, ');
    if (server && typeof server.close === 'function') {
      print('shutting down gracefully');
      if (server instanceof EventEmitter) {
        server.once('close', shutdown);
        server.close();
      } else {
        server.close(shutdown);
      }
    } else {
      print('shutting down now!');
      shutdown();
    }
  }

  process.on('SIGINT', onSignal.bind(null, 'SIGINT'));
  process.on('SIGTERM', onSignal.bind(null, 'SIGTERM'));

};
