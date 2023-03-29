//API notification messages

export const API_NOTIFICATION_MESSAGES ={
    loading:{
        title:'Loading...',
        message:'Data is loading, please wait'
    },
    success:{
        title:'Success',
        message:'Data loaded successfully'
    },
    responseFailure:{
        title:'Error',
        message:'An error occured while fetching response from the server. Please try again'
    },
    requestFailue:{
        title:'Error',
        message:'An error occured while parsing request data'
    },
    networkError:{
        title:'Error',
        message:'Unable to connect to the server, please check your internet connection.'
    }
}


///API SERVICE CALL
///SAMPLE REQ
///NEED SERVICE CALL:{url:'/',method:'POST/GET/PUT/DELETE' params:true/false, query:true/false}

export const SERVICE_URLS = {
    userSignup:{url:'/signup',method:'POST'}
}