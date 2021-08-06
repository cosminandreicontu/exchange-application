let auth = localStorage.getItem('token');
if (auth){
    auth = JSON.parse(auth)
}
export default {
  data:{
  },
  login: {
    token: auth && auth.token ? auth.token : null,
    userName:auth && auth.user ? auth.user : null,
    isUserAuthenticated:false
  }
};
