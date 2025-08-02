const getUserDetails = () => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  let user = null;

  try {
    if (userString && userString !== "undefined") {
      user = JSON.parse(userString);
    }
  } catch (e) {
    console.error("Error parsing user:", e);
  }

  return { token, user };
};

export default getUserDetails;
