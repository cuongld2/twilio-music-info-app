import { NextApiRequest, NextApiResponse } from "next";
import { topArtists,getArtistInfo } from "../../../lib/spotify";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await topArtists();
  const { items } = await response.json();

  let artists = [];

  for(let i=0; i<items.length; i++){
    const localResponse = await getArtistInfo(items[i].id);
    const localResponseJson = await localResponse.json();
    artists.push({
      id: items[i].id,
      name: items[i].name,
      url: items[i].external_urls.spotify,
      followers: localResponseJson.followers.total,
      coverImage: items[i].images[1],
    })
}

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(artists);
}
