import axios from "axios";

axios.defaults.baseURL = 'https://django-rest-fw.herokuapp.com/'
/* zu dieser api wird gesendet */
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
/* Als Nächstes setzen wir den "Content-Type"-Header auf "multipart/form-data", 
da dies das Datenformat ist, das die API erwartet. 
Wir benötigen "multipart", da unsere Anwendung sowohl mit Bildern als 
auch mit Text in ihren Anfragen umgehen wird. */
axios.defaults.withCredentials = true
/* To avoid any CORS errors when sending cookies, 
we also need to set withCredentials to true */

export const axiosReq = axios.create();
export const axiosRes = axios.create();
/* diese beiden ermöglichen, dass der user 24h eingelogged bleibt, wenn er
sich nicht auslogged */
/* das muss igegndwo plaziert werden, bevor die children montiert werden
also in currentUserContext in einer Funktion (usermemo) */