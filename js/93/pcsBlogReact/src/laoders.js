const userTime = 5 * 60 * 1000;
let cleanedUpLocalStorage = false;

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
  if (!cleanedUpLocalStorage) {
    clearExpiredCache();
  }

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

  return { userData, loadTime };
}

function clearExpiredCache() {
  const now = Date.now();

  // Collect keys first to avoid mutation issues
  const keys = Object.keys(localStorage);

  keys.forEach((key) => {
    try {
      const value = localStorage.getItem(key);
      if (!value) return;

      const parsed = JSON.parse(value);

      // Only process items that look like cache entries
      if (
        typeof parsed === "object" &&
        typeof parsed.currentTime === "number"
      ) {
        if (parsed.currentTime + userTime <= now) {
          localStorage.removeItem(key);
          console.log(`Removed expired cache: ${key}`);
        }
      }
    } catch (err) {
      // Ignore non-JSON entries
      console.log(err);
    }

    cleanedUpLocalStorage = true;
  });
}

export async function loadUser(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?id=${userId}`);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    let user = await response.json();
    return user[0];
  } catch (e) {
    console.error("Error loading user data:", e);
  }
}
