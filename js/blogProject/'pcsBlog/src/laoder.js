//import { use } from "react";

function saveCache(key, data) {
  localStorage.setItem(
    key,
    JSON.stringify({
      currentTime: Date.now(),
      data,
    })
  );
}

export async function loadUsers(url) {
  let userData;

    try {
      console.log("fetching user data");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      userData = await response.json();
      saveCache("users", userData);
    } catch (e) {
      console.error("Error loading user data:", e);
    }
  

  return userData;
}

export async function loadMoreInfo(type, Id) {
  try {
    console.log(`fetching ${type} data`);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/${type}?${type}Id=${Id}`
    );
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    return response.json();
  } catch (e) {
    console.error(`Error loading blog ${type}:`, e);
  }
}
