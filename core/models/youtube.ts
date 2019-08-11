export type YoutubeModel = {
  youtubes: YoutubeItem[]
}

export type YoutubeItem = {
  videoId: string;
  title: string;
  ordinal: number;
}
