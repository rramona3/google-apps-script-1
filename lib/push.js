var authenticate = require('./functions/authenticate.js');
var getId = require('./functions/getId.js');
var packLocal = require('./functions/packLocal.js');
var pushToRemote = require('./functions/pushToRemote.js');
var downloadRemote = require('./functions/downloadRemote.js');
var pull = require('./pull.js');

/**
 * Push all local code to the remote Google Apps Script project
 */
module.exports = function() {
    authenticate([], function(err, oauth2Client) {
        if (err) {
            console.log('gas returned an error: ' + err);
        } else {
            getId(function(err, fileId, name) {
                if (err) {
                    console.log('gas returned an error: ' + err);
                } else {
                    downloadRemote(oauth2Client, fileId, null, 'pull', function(err) {
                        if (err) {
                            console.log('gas returned an error: ' + err);
                        } else {
                            packLocal(function(err) {
                                if (err) {
                                    console.log('gas returned an error: ' + err);
                                } else {
                                    pushToRemote(oauth2Client, fileId, function(err, result) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log('Succesfully deployed local version to Google Drive.');
                                            pull(null, false);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}
