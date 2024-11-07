const backendDomain = 'http://localhost:8080/api/'

const routeApi = {
    signupAPI: {
        url: `${backendDomain}auth/signup`,
        method: 'POST'
    }, 
    loginApi: {
        url: `${backendDomain}auth/login`,
        method: 'POST'
    },
    userInfo:{
        url: `${backendDomain}auth/user`,
        method: 'GET'
    }
}

export default  routeApi