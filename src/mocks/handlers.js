import { rest } from "msw";

const baseURL = "https://django-rest-fw.herokuapp.com/";
// Next, we’ll need to grab our API base url
// for our mock responses. So we’ll define a new variable called baseURL, and then grab the value
// for it from our axiosDefaults file

export const handlers = [
    // we export an array called handlers, which we’ll
    // use to store our mocked request handlers
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    /* wir checken ob eine anmeldung mit baseURL/... funktioniert (mit req, res u. context) */
    /* dafür melden wir uns im programm an und geben {baseURL}dj-rest-auth/user/ in ein anderes tab ein
    dann sehen wir welche daten wir als res bekommen. diese stehen unten*/
    return res(
      ctx.json({
        pk: 2,
        username: "brian",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 2,
        profile_image:
          "https://res.cloudinary.com/dgjrrvdbl/image/upload/v1/media/../default_profile_qdjgyp",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
    /* jetzt testen wir ob logout funktioniert */
  }),
];