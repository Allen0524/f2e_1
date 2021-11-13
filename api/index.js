import jsSHA from "jssha";

export function getAuthorizationHeader() {
  let AppID = "d5eeee97da8b4d18a8a1350c1f87dfe3";
  let AppKey = "9Sf8FW4Z5L-dt0cQIsRKjs67G7E";

  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, "X-Date": GMTString };
}
