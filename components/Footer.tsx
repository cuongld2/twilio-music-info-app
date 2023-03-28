import Link from "next/link";
import Image from "next/image";
import {
  FadeContainer,
  opacityVariant,
  popUp,
} from "../content/FramerMotionVariants";
import { motion } from "framer-motion";
import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { Song } from "@lib/types";

export default function Footer({
}: {
  setShowQR: (value: boolean) => void;
  showQR: boolean;
}) {
  const { data: currentSong } = useSWR("/api/now-playing", fetcher);

  return (
    <footer className="w-screen text-gray-600 dark:text-gray-400/50 font-inter mb-14 print:hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={FadeContainer}
        viewport={{ once: true }}
        className="flex flex-col max-w-4xl gap-5 p-5 mx-auto text-sm border-t-2 border-gray-200 2xl:max-w-5xl 3xl:max-w-7xl dark:border-gray-400/10 sm:text-base"
      >
        <div>
          {currentSong?.isPlaying ? (
            <WhenPlaying song={currentSong} />
          ) : (
            <NotPlaying />
          )}
        </div>

        <motion.div
          variants={opacityVariant}
          className="flex items-center justify-center gap-2 mt-5 text-black dark:text-white"
        >
          <span>Music heals your soul - Powered by</span>

          <Link
            target="_blank"
            aria-label="Next.js"
            rel="noreferrer"
            href="https://nextjs.org"
            className="font-semibold hover:underline"
          >
            Spotify
          </Link>
        </motion.div>
      </motion.div>
    </footer>
  );
}


function NotPlaying() {
  return (
    <div className="flex flex-row-reverse items-center justify-between gap-2 sm:flex-row sm:justify-start">
      <SiSpotify className="w-6 h-6" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
        <div className="font-semibold text-black md:text-lg dark:text-white">
          Not Playing
        </div>
        <span className="hidden md:inline-flex">—</span>
        <p className="text-xs text-gray-500 sm:text-sm">Spotify</p>
      </div>
    </div>
  );
}

function WhenPlaying({ song }: { song: Song }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-semibold dark:text-gray-300">Now Playing</h4>
      <Link
        href={song.songUrl}
        className="flex items-center justify-between p-3 bg-gray-200 rounded-sm dark:bg-darkSecondary sm:p-4"
      >
        <div className="flex items-center gap-2 ">
          <div className="w-10 h-10">
            <Image
              alt={song.title}
              src={song.albumImageUrl}
              width={40}
              height={40}
              quality={50}
              placeholder="blur"
              blurDataURL={song.albumImageUrl}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <h3 className="font-semibold text-black md:text-lg dark:text-white animate-">
              {song.title}
            </h3>
            <span className="hidden md:inline-flex dark:text-gray-300">—</span>

            <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              {song.artist}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SiSpotify className="w-6 h-6 text-green-500 animate-[spin_4s_linear_infinite]" />
        </div>
      </Link>
    </div>
  );
}
