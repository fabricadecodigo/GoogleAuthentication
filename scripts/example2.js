/**
  Função para iniciar o app
*/
var startApp = function() {
  gapi.load('auth2', function(){
    auth2 = gapi.auth2.init({
      //nesse exemplo o client id também pode ser informado pela meta tag "google-signin-client_id"
      //caso ele não seja informado aqui
      client_id: '783017677176-jl5qbms08409ts13boc6i7i8bodr44gt.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: 'profile email' // solicitando acesso ao profile e ao e-mail do usuário
    });
    auth2.attachClickHandler(document.getElementById('customBtn'), {}, onSuccess, onFailure);
  });
};

/**
  Função executada quando o login é efetuado com sucesso
*/
function onSuccess(googleUser) {
    // Recuperando o profile do usuário
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // Recuperando o token do usuario. Essa informação você necessita passar para seu backend
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
}
/**
  Função executada quando ocorrer falha no logn
*/
function onFailure(error) {
    console.log(error);
}

/**
  Função de deslogar o usuario
*/
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
