// Helper function
// Used for authenticate the password
// Takes in input and authenticate with password
// returns true in case of pass else false

export default function pass() {
  let i = sessionStorage.getItem("password");
  if (i === "wow") {
    return true;
  }
  return false;
}
