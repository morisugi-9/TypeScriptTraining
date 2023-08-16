import axios from "../node_modules/axios/index";
import "googlemaps";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = ""; // googleから取得が必要

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

// npm install --save-dev @types/googlemaps
// declare var google: any;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // Google API に送信
  // 3rd party tool
  // fetch();
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("座標取得に失敗しました！");
      }
      console.log("response");
      console.log(response);
      const coordinates = response.data.results[0].geometry.location;
      console.log(coordinates);
      const map = new google.maps.Map(document.getElementById('map')!,{
        center: coordinates,
        zoom: 16
      });
      const marker = new google.maps.Marker({position: coordinates, map: map});
    })
    .catch((error) => {
      console.log("error");
      alert(error.message);
    });
}

form.addEventListener("submit", searchAddressHandler);
