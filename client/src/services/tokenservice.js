export const getToken = () => 
     localStorage.getItem('lectureAPP')??'';


export const setToken = (token) =>  
    localStorage.setItem('lectureAPP',token)??'';
