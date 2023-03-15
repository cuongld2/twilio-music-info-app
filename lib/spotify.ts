import { SpotifyAccessToken } from "./types";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;


const getAccessToken = async (): Promise<SpotifyAccessToken> => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {

      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },

    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token!,
    }),
  });

  return response.json();
};

export const topTracks = async (): Promise<Response> => {
  // Obtain an access token
  const { access_token }: { access_token: string } = await getAccessToken();
  console.log(access_token);

  return fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const topArtists = async () => {
  const { access_token } = await getAccessToken();

  return fetch(
    "https://api.spotify.com/v1/me/top/artists?limit=10&time_range=short_term",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const getArtistInfo = async (artistId: string) => {


const { access_token } = await getAccessToken();

  return fetch(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

}

export const currentlyPlayingSong = async () => {

  const { access_token } = await getAccessToken();

  return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
