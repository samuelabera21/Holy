// const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
// const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

// const CACHE_KEY = "youtube_videos_cache";
// const CACHE_TIME = 30 * 60 * 1000; // 30 minutes

// export async function fetchChannelVideos(maxResults = 6) {
//   const cached = localStorage.getItem(CACHE_KEY);

//   // 1️⃣ Use cache if fresh
//   if (cached) {
//     const { data, timestamp } = JSON.parse(cached);
//     const cacheFresh = Date.now() - timestamp < CACHE_TIME;

//     if (cacheFresh) {
//       console.log("📦 Cache fresh — using cached videos");
//       return data;
//     }
//   }

//   console.log("⏳ Cache expired — checking latest upload");

//   // 2️⃣ Cache expired → check ONLY ONE video
//   const latestUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=1`;

//   const latestRes = await fetch(latestUrl);
//   const latestJson = await latestRes.json();

//   if (!latestJson.items) {
//     throw new Error("Failed to check latest video");
//   }

//   const latestVideoId = latestJson.items[0].id.videoId;

//   // 3️⃣ Compare with cached latest (if exists)
//   if (cached) {
//     const { data } = JSON.parse(cached);
//     const cachedLatestId = data[0]?.youtubeId;

//     if (cachedLatestId === latestVideoId) {
//       console.log("✅ No new uploads — refreshing timestamp only");

//       localStorage.setItem(
//         CACHE_KEY,
//         JSON.stringify({
//           data,
//           timestamp: Date.now()
//         })
//       );

//       return data;
//     }
//   }

//   console.log("🆕 New video detected — fetching full list");

//   // 4️⃣ New video → fetch full list
//   const listUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=${maxResults}`;

//   const res = await fetch(listUrl);
//   const json = await res.json();

//   if (!json.items) {
//     throw new Error("Failed to fetch videos");
//   }

//   const videos = json.items.map(item => ({
//     id: item.id.videoId,
//     youtubeId: item.id.videoId,
//     title: item.snippet.title,
//     description: item.snippet.description,
//     thumbnail: item.snippet.thumbnails.high.url
//   }));

//   // 5️⃣ Update cache
//   localStorage.setItem(
//     CACHE_KEY,
//     JSON.stringify({
//       data: videos,
//       timestamp: Date.now()
//     })
//   );

//   return videos;
// }






// const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
// const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

// const CACHE_KEY = "youtube_videos_cache";
// const CACHE_TIME = 30 * 60 * 1000; // 30 minutes

// export async function fetchChannelVideos(maxResults = 6) {
//   const cachedRaw = localStorage.getItem(CACHE_KEY);
//   const cached = cachedRaw ? JSON.parse(cachedRaw) : null;

//   // 1️⃣ If cache exists and is fresh → return immediately
//   if (cached) {
//     const isFresh = Date.now() - cached.timestamp < CACHE_TIME;
//     if (isFresh) {
//       console.log("📦 Cache fresh — returning cached videos");
//       return { status: "ok", data: cached.data };
//     }
//   }

//   // 2️⃣ Cache expired → check ONLY latest upload (1 unit)
//   try {
//     console.log("🔍 Checking latest upload");

//     const latestUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=1`;

//     const latestRes = await fetch(latestUrl);
//     const latestJson = await latestRes.json();

//     const latestVideoId = latestJson.items?.[0]?.id?.videoId;

//     // 3️⃣ If latest matches cached → refresh timestamp only
//     if (cached && cached.data[0]?.youtubeId === latestVideoId) {
//       console.log("✅ No new video — refreshing cache timestamp");

//       localStorage.setItem(
//         CACHE_KEY,
//         JSON.stringify({
//           data: cached.data,
//           timestamp: Date.now()
//         })
//       );

//       return { status: "ok", data: cached.data };
//     }

//     // 4️⃣ New video detected → fetch full list
//     console.log("🆕 New video detected — fetching full list");

//     const listUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=${maxResults}`;

//     const res = await fetch(listUrl);
//     const json = await res.json();

//     if (!json.items) {
//       throw new Error("Invalid video list response");
//     }

//     const videos = json.items.map(item => ({
//       id: item.id.videoId,
//       youtubeId: item.id.videoId,
//       title: item.snippet.title,
//       description: item.snippet.description,
//       thumbnail: item.snippet.thumbnails.high.url
//     }));

//     localStorage.setItem(
//       CACHE_KEY,
//       JSON.stringify({
//         data: videos,
//         timestamp: Date.now()
//       })
//     );

//     return { status: "ok", data: videos };

//   } catch (error) {
//     console.warn("⚠️ YouTube API failed");

//     // 5️⃣ API failed → fallback to cache if possible
//     if (cached) {
//       console.log("📦 Using cached videos despite API failure");
//       return { status: "ok", data: cached.data };
//     }

//     // 6️⃣ Total failure (no cache)
//     return {
//       status: "error",
//       message: "Videos are temporarily unavailable."
//     };
//   }
// }






const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

const CACHE_KEY = "youtube_videos_cache";
const CACHE_TIME = 30 * 60 * 1000; // 30 minutes

export async function fetchChannelVideos(maxResults = 6) {
  const cached = localStorage.getItem(CACHE_KEY);

  // 🧠 1️⃣ If cache exists, keep a reference
  let cachedData = null;
  if (cached) {
    cachedData = JSON.parse(cached);
  }

  // 🌐 2️⃣ If offline, return cache immediately
  if (!navigator.onLine) {
    if (cachedData) {
      return {
        status: "warning",
        messageKey: "videos.status.offlineWarning",
        message: "You are offline. Showing cached videos.",
        data: cachedData.data
      };
    }

    return {
      status: "error",
      messageKey: "videos.status.offlineError",
      message: "You are offline and no cached videos are available.",
      data: []
    };
  }

  // ⏳ 3️⃣ If cache is fresh, use it
  if (cachedData) {
    const isFresh = Date.now() - cachedData.timestamp < CACHE_TIME;
    if (isFresh) {
      return {
        status: "ok",
        data: cachedData.data
      };
    }
  }

  try {
    // 🔍 4️⃣ Check latest upload (1 video only)
    const latestUrl =
      `https://www.googleapis.com/youtube/v3/search` +
      `?key=${API_KEY}&channelId=${CHANNEL_ID}` +
      `&part=snippet&type=video&order=date&maxResults=1`;

    const latestRes = await fetch(latestUrl);
    const latestJson = await latestRes.json();

    if (!latestJson.items) {
      throw new Error("Quota exceeded or invalid response");
    }

    const latestVideoId = latestJson.items[0].id.videoId;

    // 🔄 5️⃣ Compare with cache
    if (cachedData) {
      const cachedLatestId = cachedData.data[0]?.id;

      if (cachedLatestId === latestVideoId) {
        // Same videos → refresh timestamp only
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: cachedData.data,
            timestamp: Date.now()
          })
        );

        return {
          status: "ok",
          data: cachedData.data
        };
      }
    }

    // 🆕 6️⃣ Fetch full list (new upload detected)
    const listUrl =
      `https://www.googleapis.com/youtube/v3/search` +
      `?key=${API_KEY}&channelId=${CHANNEL_ID}` +
      `&part=snippet&type=video&order=date&maxResults=${maxResults}`;

    const res = await fetch(listUrl);
    const json = await res.json();

    if (!json.items) {
      throw new Error("Failed to fetch videos");
    }

    // // 🧼 7️⃣ Normalize data (CRITICAL)
    // const videos = json.items.map(item => ({
    //   id: item.id.videoId, // ✅ single source of truth
    //   title: item.snippet.title,
    //   description: item.snippet.description,
    //   thumbnail: item.snippet.thumbnails.high.url
    // }));


    // 🧼 7️⃣ Normalize data (CRITICAL)
const videos = json.items.map(item => {
  const thumbnails = item.snippet.thumbnails;

  return {
    id: item.id.videoId, // ✅ single source of truth
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail:
      thumbnails?.high?.url ||
      thumbnails?.medium?.url ||
      thumbnails?.default?.url ||
      ""
  };
});


    // 💾 8️⃣ Update cache
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: videos,
        timestamp: Date.now()
      })
    );

    return {
      status: "ok",
      data: videos
    };

  } catch (error) {
    console.error(error);

    if (cachedData) {
      return {
        status: "warning",
        messageKey: "videos.status.unavailableWarning",
        message: "YouTube is unavailable. Showing cached videos.",
        data: cachedData.data
      };
    }

    return {
      status: "error",
      messageKey: "videos.status.unavailableError",
      message: "Unable to load videos right now.",
      data: []
    };
  }
}




// const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
// const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

// const CACHE_KEY = "youtube_videos_cache";
// const CACHE_TIME = 30 * 60 * 1000;

// function isOffline() {
//   return !navigator.onLine;
// }

// function isQuotaError(json) {
//   return json?.error?.errors?.[0]?.reason === "quotaExceeded";
// }

// function formatVideos(items) {
//   return items.map(item => ({
//     id: item.id.videoId,
//     title: item.snippet.title,
//     description: item.snippet.description,
//     thumbnail:
//       item.snippet.thumbnails?.high?.url ||
//       item.snippet.thumbnails?.medium?.url ||
//       ""
//   }));
// }

// export async function fetchChannelVideos({ maxResults = 12 } = {}) {
//   const cached = localStorage.getItem(CACHE_KEY);

//   if (isOffline() && cached) {
//     return {
//       status: "warning",
//       data: JSON.parse(cached).data,
//       message: "Offline — showing saved videos."
//     };
//   }

//   if (cached) {
//     const { data, timestamp } = JSON.parse(cached);
//     if (Date.now() - timestamp < CACHE_TIME) {
//       return { status: "ok", data, message: null };
//     }
//   }

//   try {
//     const url =
//       `https://www.googleapis.com/youtube/v3/search` +
//       `?key=${API_KEY}` +
//       `&channelId=${CHANNEL_ID}` +
//       `&part=snippet` +
//       `&type=video` +
//       `&order=date` +
//       `&maxResults=${maxResults}`;

//     const res = await fetch(url);
//     const json = await res.json();

//     if (isQuotaError(json)) {
//       throw new Error("quota");
//     }

//     if (!json.items) {
//       throw new Error("invalid");
//     }

//     const videos = formatVideos(json.items);

//     localStorage.setItem(
//       CACHE_KEY,
//       JSON.stringify({ data: videos, timestamp: Date.now() })
//     );

//     return { status: "ok", data: videos, message: null };

//   } catch {
//     if (cached) {
//       return {
//         status: "warning",
//         data: JSON.parse(cached).data,
//         message: "Showing cached videos."
//       };
//     }

//     return {
//       status: "error",
//       data: [],
//       message: "Unable to load videos."
//     };
//   }
// }
