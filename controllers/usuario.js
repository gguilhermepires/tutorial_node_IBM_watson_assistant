
 exports.getIndex = (req, res, next) => {
    res.render('login.html');
};


exports.entrar = (req1, res1, next) => {
    const AssistantV2 = require('ibm-watson/assistant/v2');
    const { IamAuthenticator } = require('ibm-watson/auth');
   
    const assistantId = 'colocar as o id aqui, conforme a pasta tutorial key ibm';
    const apiKey = 'colocar a api key aqui, conforme a pasta tutorial key ibm';
  
      

    const assistant2 = new AssistantV2({
      version: '2020-02-05',
      use_vcap_services: false,
      authenticator: new IamAuthenticator({
        apikey:apiKey ,
      }),  
    });
   
  
    assistant2.createSession({
        assistantId: assistantId
      })
        .then(res => {
            res1.cookie("sessaoId", res.result.session_id);
            res1.redirect('/principal');
        }).catch(e=>{
          console.log("erro ao abrir sessão",e);
          res1.redirect('/');
        });
};

exports.principal = (req, res, next) => {
    res.render('principal.html');
};
