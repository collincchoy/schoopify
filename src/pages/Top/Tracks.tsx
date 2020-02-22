import React, { useState } from "react";
import TrackGallery from "../../components/Track/Gallery";
import { PersonalizationTimeRange, Track } from "../../spotify/types";
import { usePaginatedSpotifyApi } from "../../spotify/hooks";
import SpotifyErrorMessage from "../../spotify/SpotifyErrorMessage";
import TimeRangePicker from "../../components/TimeRangePicker";
import PageContent from "components/PageContent";

export default function TopTracksPage() {
  const [timeRange, setTimeRange] = useState<string>(
    PersonalizationTimeRange.MEDIUM
  );
  const {
    items,
    error,
    loadMoreItems,
    nextPage,
    reset
  } = usePaginatedSpotifyApi<Track>(`/me/top/tracks?time_range=${timeRange}`);

  const changeTimeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeRange(e.currentTarget.value);
    reset();
  };
  return (
    <PageContent>
      {error ? (
        <SpotifyErrorMessage {...error} />
      ) : (
        <>
          <TimeRangePicker
            selected={timeRange as PersonalizationTimeRange}
            onChange={changeTimeRange}
          />
          <TrackGallery
            tracks={items}
            loadMoreTracks={loadMoreItems}
            moreTracksAvailable={!!nextPage}
          />
        </>
      )}
    </PageContent>
  );
}
