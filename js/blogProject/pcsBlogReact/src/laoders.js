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

export async function loader(url, key, reloadOverride = false) {
  let userData;
  let loadTime;
  const cacheResponse = loadCache(key, userTime);

  if (cacheResponse === null || reloadOverride) {
    try {
      console.log("fetching user data");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      userData = await response.json();
      loadTime = new Date();
      saveCache(key, userData);
    } catch (e) {
      console.error("Error loading user data:", e);
    }
  } else {
    userData = cacheResponse.data;
    loadTime = cacheResponse.currentTime;
  }

  return {userData, loadTime};
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
      displayLoadTime.innerHTML = `Last reloaded at: ${new Date().toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }
      )}`;
      saveCache(`${type}-${Id}`, fetchedData);
      data = fetchedData;
    } catch (e) {
      console.error(`Error loading blog ${type}:`, e);
    }
  } else {
    data = response.data;
    displayLoadTime.innerHTML = `Last reload at:${new Date(
      response.currentTime
    ).toLocaleTimeString()}`;
  }
  return data;
}
