import React from "react";
import useSWR from "swr";
import {opacityVariant } from "@content/FramerMotionVariants";
import fetcher from "@lib/fetcher";
import Track from "@components/Stats/Track";
import Artist from "@components/Stats/Artist";
import AnimatedHeading from "@components/FramerMotion/AnimatedHeading";
import AnimatedText from "@components/FramerMotion/AnimatedText";
import { SpotifyArtist, SpotifyTrack } from "@lib/types";
import { useRef, useState } from 'react';
import{Button} from '../components/Button'

type Stats = {
  title: string;
  value: string;
};

export default function Stats() {
  const { data: topTracks } = useSWR("/api/stats/tracks", fetcher);
  const { data: artists } = useSWR("/api/stats/artists", fetcher);

  const inputEmail = useRef(null);
  const inputMailContent = useRef(null);
  const [message, setMessage] = useState('');


  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const emailValue: string = inputEmail.current.value;
    const mailContent: string = inputMailContent.current.value;

    console.log(emailValue);
    console.log(mailContent);

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailValue.match(validRegex)) {
      setMessage('Please introduce a correct email address');
    }

    try {
      const response = await fetch('/api/save-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, mailContent:mailContent }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (e) {
      console.log('ERROR', e);
    }

    inputMailContent.current.value="";
    inputEmail.current.value="";
  };


  return (
    <>
      <section className="pageTop font-inter">
        {/* Spotify top songs */}
        <div className="font-barlow">
          <AnimatedHeading
            variants={opacityVariant}
            className="text-3xl font-bold capitalize sm:text-4xl text-neutral-900 dark:text-neutral-200"
          >
            Favorite songs
          </AnimatedHeading>

          <AnimatedText
            variants={opacityVariant}
            className="mt-4 text-gray-700 dark:text-gray-300"
          >
            <span className="font-semibold">
              {topTracks ? (
                topTracks[0].title
              ) : (
                <span className="w-20 h-6 bg-white dark:bg-darkSecondary"></span>
              )}
            </span>{" "}
            is the song I liked most in last 4 weeks.
          </AnimatedText>
          <div className="flex flex-col gap-0 my-10 font-barlow">
            {topTracks ? (
              topTracks?.map((track: SpotifyTrack, index: number) => (
                <Track
                  key={index}
                  id={index}
                  url={track.url}
                  title={track.title}
                  coverImage={track.coverImage.url}
                  artist={track.artist}
                />
              ))
            ) : (
              <LoadingSongs />
            )}
          </div>
        </div>

        {/* Spotify top Artists */}

        <div className="font-barlow">
          <AnimatedHeading
            variants={opacityVariant}
            className="text-3xl font-bold capitalize sm:text-4xl text-neutral-900 dark:text-neutral-200"
          >
            Favorite artists
          </AnimatedHeading>
          <AnimatedText
            variants={opacityVariant}
            className="mt-4 text-gray-700 dark:text-gray-300"
          >
            My favorite artist is{" "}
            <span className="font-semibold">
              {artists ? (
                artists[0].name
              ) : (
                <span className="w-20 h-6 bg-white dark:bg-darkSecondary"></span>
              )}
            </span>{" "}
            in last 4 weeks on Spotify.
          </AnimatedText>

          <div className="flex flex-col gap-0 my-10 font-barlow">
            {artists ? (
              artists?.map((artist: SpotifyArtist, index: number) => (
                <Artist
                  key={index}
                  id={index}
                  name={artist.name!}
                  url={artist.url}
                  coverImage={artist.coverImage.url}
                  followers={artist.followers!}
                />
              ))
            ) : (
              <LoadingArtists />
            )}
          </div>
        </div>
      <div className="place_single_page">
      <form onSubmit={onSubmit} className="saveLinks">
      <AnimatedHeading
            variants={opacityVariant}
            className="text-3xl font-bold capitalize sm:text-4xl text-neutral-900 dark:text-neutral-200"
          >
            Save the Spotify links to your emails
          </AnimatedHeading>
        <div className="flex flex-col gap-0 my-4 font-barlow">
        <label><strong>EMAIL</strong></label>
        <input
          ref={inputEmail}
          type="email"
          id="email"
          placeholder="Please insert your email here"
        />
        </div>
        <div className="flex flex-col gap-0 my-4 font-barlow">
        <label>
          <strong>CONTENT</strong></label>
        <input
          ref={inputMailContent}
          type="mailContent"
          id="mailContent"
          placeholder="Please insert your email content"
        />
        </div>
        <div className="flex flex-col gap-0 my-4 font-barlow"></div>
        <Button></Button>
        {/* <button type="submit">Submit</button> */}
      </form>
      <AnimatedText
            variants={opacityVariant}
            className="mt-4 text-gray-700 dark:text-gray-300"
          >{message}
        </AnimatedText>
    </div>
      </section>
    </>
  );
}

// Loading Components
function LoadingSongs() {
  return (
    <>
      {Array.from(Array(10).keys()).map((item) => (
        <div
          key={item}
          className="bg-gray-100 h-[80.8px] first:h-[81.6px] first:md:h-[85.6px] md:h-[84.8px]  dark:bg-darkPrimary  border-l first:border-t border-r border-b  border-gray-300 dark:border-neutral-600 p-4 font-barlow flex items-center gap-5 overflow-hidden relative xs:pl-16 md:!pl-20 "
        >
          <div className="absolute hidden tracking-wider origin-center transform left-4 md:left-6 font-inter xs:inline-flex">
            #{item + 1}
          </div>

          <div className="relative w-12 h-12 origin-center transform bg-white dark:bg-darkSecondary animate-pulse"></div>
          <div className="flex flex-col gap-1">
            <p className="animate-pulse w-40 h-6 md:h-[28px] bg-white dark:bg-darkSecondary"></p>
            <p className="h-4 bg-white animate-pulse w-28 md:h-6 dark:bg-darkSecondary delay-125"></p>
          </div>
        </div>
      ))}
    </>
  );
}

function LoadingArtists() {
  return (
    <>
      {Array.from(Array(5).keys()).map((item) => (
        <div
          key={item}
          className="h-[80.8px] first:h-[81.6px] first:md:h-[129.6px] md:h-[128.8px]  bg-gray-100  dark:bg-darkPrimary  border-l first:border-t border-r border-b border-gray-300 dark:border-neutral-600 p-4 font-barlow flex items-center gap-5 overflow-hidden"
        >
          <>
            <div className="hidden tracking-wider origin-center transform font-inter xs:inline-flex">
              #{item + 1}
            </div>
            <div
              aria-label="image"
              className="relative w-12 h-12 bg-white rounded-full animate-pulse dark:bg-darkSecondary md:w-24 md:h-24"
            ></div>
            <div className="flex flex-col gap-1">
              <h2
                aria-label="artist-name"
                className="animate-pulse h-6 md:h-[28px] w-40 bg-white dark:bg-darkSecondary"
              ></h2>
              <p
                aria-label="followers"
                className="w-20 h-4 bg-white animate-pulse md:h-6 dark:bg-darkSecondary"
              ></p>
            </div>
          </>
        </div>
      ))}
    </>
  );
}
