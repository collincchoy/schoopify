import React, { useState } from "react";
import { Tabs } from "react-bulma-components";
import { ArtistGallery } from "./components/artist";
import { TrackGallery } from "./components/track";
import { PersonalizationTimeRange } from "../spotify/types";
import Profile from './components/Profile';
import TimeRangePicker from "./components/TimeRangePicker";

enum ViewType {
  TOP_ARTISTS = "Top Artists",
  TOP_TRACKS = "Top Tracks"
}

export function PersonalPage() {
  const [currentView, setCurrentView] = useState(ViewType.TOP_ARTISTS);
  const [timeRange, setPeriod] = useState(PersonalizationTimeRange.MEDIUM);
  const changeTimeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPeriod(e.currentTarget.value as PersonalizationTimeRange);
  };

  const handleTabChange = (nextView: ViewType) => {
    if (nextView !== currentView) {
      setCurrentView(nextView);
    }
  };

  const renderTab = (name: ViewType) => (
    <Tabs.Tab
      active={name === currentView}
      onClick={() => handleTabChange(name)}
    >
      {name}
    </Tabs.Tab>
  );

  return (
    <>
      <Profile/>
      <Tabs className="header" align="centered" type="boxed" size="large">
        {renderTab(ViewType.TOP_ARTISTS)}
        {renderTab(ViewType.TOP_TRACKS)}
      </Tabs>
      <TimeRangePicker
        selected={timeRange as PersonalizationTimeRange}
        onChange={changeTimeRange}
      />
      {currentView === ViewType.TOP_TRACKS ? (
        <TrackGallery />
      ) : (
        <ArtistGallery timeRange={timeRange} />
      )}
    </>
  );
}
