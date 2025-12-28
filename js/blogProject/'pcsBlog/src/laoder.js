//import { use } from "react";
const displayLoadTime = document.querySelector("#lastReloadTime");
const userTime = 5 * 60 * 1000;
const postTime = 3 * 60 * 1000;
const commentTime = 1 * 60 * 1000;

function saveCache(key, data) {
  localStorage.setItem(
    key,
    JSON.stringify({
      currentTime: Date.now(),
      data,
    })
  );
}

function loadCache(key, addedTime) {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    if (parsedData.currentTime + addedTime > Date.now()) {
      console.log(`loading ${key} from cache`);
      return parsedData /*.data*/;
    } else {
      localStorage.removeItem(key);
    }
  }
  return null;
}

export async function loadUsers(url,reloadOverride = false) {
  let userData;
  const response = loadCache("users", userTime);

  if (response === null || reloadOverride) {
    try {
      console.log("fetching user data");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      userData = await response.json();
      displayLoadTime.innerHTML = `Last reload at:${new Date().toLocaleTimeString()}`;
      saveCache("users", userData);
    } catch (e) {
      console.error("Error loading user data:", e);
    }
  } else {
    userData = response.data;
    displayLoadTime.innerHTML = `Last reload at:${new Date(
      response.currentTime
    ).toLocaleTimeString()}`;
  }

  return userData;
}

export async function loadMoreInfo(type, Id, reloadOverride = false) {
  let data;
  const typeTime =
    type === "users" ? userTime : type === "posts" ? postTime : commentTime;

  const response = loadCache(`${type}-${Id}`, typeTime);

  if (response === null || reloadOverride) {
    try {
      console.log(`fetching ${type} data`);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${type}?${type}Id=${Id}`
      );
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      const fetchedData = await response.json();
      displayLoadTime.innerHTML = `Last reloaded at:${new Date().toLocaleTimeString()}`;
      saveCache(`${type}-${Id}`, fetchedData);
      data = fetchedData;
    } catch (e) {
      console.error(`Error loading blog ${type}:`, e);
    }
  }else{
    data = response.data;
    displayLoadTime.innerHTML = `Last reload at:${new Date(
      response.currentTime
    ).toLocaleTimeString()}`;
  }
  return data;
}
