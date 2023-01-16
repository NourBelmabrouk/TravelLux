(function(window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["BOOKING_HOST"] = "${BOOKING_HOST}";
  window["env"]["BOOKING_PORT"] = "${BOOKING_PORT}";
  window["env"]["BACKEND_HOST"] = "${BACKEND_HOST}";
  window["env"]["BACKEND_PORT"] = "${BACKEND_PORT}";
})(this);
