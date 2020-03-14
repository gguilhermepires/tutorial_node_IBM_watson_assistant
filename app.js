var express = require('express'),
  http = require('http'),
  path = require('path');

const flash = require('connect-flash');
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const usuarioRotas = require('./routes/usuario');

var app = express();

const cookieParser = require('cookie-parser');

app.use(flash());
app.use(cookieParser());

var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(usuarioRotas);

const assistantId = 'colocar as o id aqui, conforme a pasta tutorial key ibm';
const apiKey = 'colocar a api key aqui, conforme a pasta tutorial key ibm';


const assistant2 = new AssistantV2({
  version: '2020-02-05',
  use_vcap_services: false,
  authenticator: new IamAuthenticator({
    apikey: apiKey,
  }),
});

app.post('/detectIntent', function (request, response) {

  let texto = request.body.texto;
  var sessaoId = request.cookies.sessaoId;

  if (sessaoId) {
    assistant2.message({
      assistantId: assistantId,
      sessionId: sessaoId,
      input: {
        'message_type': 'text',
        'text': texto
      }
    })
      .then(res => {
        response.json(res);
      })
      .catch(err => {
        response.json(err);
        // console.log(err);
      });
  } else {
    response.json("nao tem sessao");
  }
})

http.createServer(app).listen(3002, '0.0.0.0', function () {
  console.log('Express server listening on port 3002');
});
