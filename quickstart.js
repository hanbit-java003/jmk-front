// e-mail 인증

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// 이러한 범위를 수정하는 경우 이전에 저장된 자격 증명을 삭제합니다.
// at ~ / .credentials / gmail-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

// 로컬 파일에서 클라이언트 비밀 정보를로드합니다.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    //로드 된 자격 증명으로 클라이언트를 인증 한 다음
    // Gmail API.
    authorize(JSON.parse(content), listLabels);
});

/**
 * 제공된 자격 증명으로 OAuth2 클라이언트를 만든 다음
   주어진 콜백 함수.
   *
   * @param {Object} credentials 권한 부여 클라이언트 신임.
   * @param {function} callback 권한이 부여 된 클라이언트와 호출 할 콜백입니다.
 */
function authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
            getNewToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
        }
    });
}

/*** 사용자 인증을 요구 한 후 새 토큰을 가져 와서 저장하십시오.
   * 인증 된 OAuth2 클라이언트로 주어진 콜백을 실행합니다.
   *
   * @param {google.auth.OAuth2} oauth2Client 토큰을 가져올 OAuth2 클라이언트입니다.
   * @param {getEventsCallback} callback 권한이있는 사용자에게 호출 할 콜백입니다.
   * 고객. 고객.
 */
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('이 애플리케이션을 승인하려면이 URL을 방문하십시오.: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('해당 페이지의 코드를 입력하십시오.: ', function(code) {
        rl.close();
        oauth2Client.getToken(code, function(err, token) {
            if (err) {
                console.log('액세스 토큰을 검색하는 동안 오류가 발생했습니다.', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}

/**
 * 디스크에 토큰을 저장하여 나중에 프로그램을 실행할 때 사용합니다.
   *
   * @param {Object} token 디스크에 저장할 토큰입니다.
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('토큰 저장 위치 ' + TOKEN_PATH);
}

/**
 * 사용자 계정의 레이블을 나열합니다.
   *
   * @param {google.auth.OAuth2} auth 인증 된 OAuth2 클라이언트입니다.
 */
function listLabels(auth) {
    var gmail = google.gmail('v1');
    gmail.users.labels.list({
        auth: auth,
        userId: 'me',
    }, function(err, response) {
        if (err) {
            console.log('API가 오류를 반환했습니다.: ' + err);
            return;
        }
        var labels = response.labels;
        if (labels.length == 0) {
            console.log('라벨이 없습니다..');
        } else {
            console.log('Labels:');
            for (var i = 0; i < labels.length; i++) {
                var label = labels[i];
                console.log('- %s', label.name);
            }
        }
    });
}