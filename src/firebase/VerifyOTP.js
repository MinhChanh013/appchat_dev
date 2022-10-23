import firebase from "./FireBase";

export const configureCaptcha = (id) => {
  const captcha = new firebase.auth.RecaptchaVerifier(id, {
    size: "invisible",
    callback: (response) => {
      onSignInSubmit();
    },
    defaultCountry: "IN",
  });
  return captcha;
};

export const onSignInSubmit = async (phone, id) => {
  let phoneNumber = `+84${phone.slice(1)}`;
  window.recaptchaVerifier = configureCaptcha(id);
  const appVerifier = window.recaptchaVerifier;
  await firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      console.log("OTP have send");
      window.confirmationResult = confirmationResult;
    })
    .catch((error) => {
      configureCaptcha().render();
      console.log(error);
    });
};

// export const configureCaptcha = (id) => {
//   console.log(id);
//   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(id, {
//     size: "invisible",
//     callback: (response) => {
//       onSignInSubmit();
//       console.log("Recaptca varified");
//     },
//     defaultCountry: "IN",
//   });
// };
// export const onSignInSubmit = (phone, id) => {
//   configureCaptcha(id);
//   let phoneNumber = `+84${phone.slice(1)}`;
//   const appVerifier = window.recaptchaVerifier;
//   firebase
//     .auth()
//     .signInWithPhoneNumber(phoneNumber, appVerifier)
//     .then((confirmationResult) => {
//       window.confirmationResult = confirmationResult;
//       console.log("OTP has been sent");
//     })
//     .catch((error) => {
//       console.log("SMS not sent");
//       console.log(error);
//     });
// };

export const onSubmitConfirm = (otp) => {
  return window.confirmationResult.confirm(otp);
};
