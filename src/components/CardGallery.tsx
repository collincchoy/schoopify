import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "./Loader";

type CardGalleryProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  renderKey: (item: T) => number | string;
  loadFunc?: (page: number) => void;
  hasMore?: boolean;
};

export function CardGallery<ItemType>(props: CardGalleryProps<ItemType>) {
  const { items, renderItem, renderKey, loadFunc, hasMore = true } = props;

  let content = (
    <div className="columns is-multiline">
      {items.map(item => (
        <div className="column is-one-fifth" key={renderKey(item)}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
  return loadFunc ? (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadFunc}
      hasMore={hasMore}
      loader={<Loader key={0} />}
    >
      {content}
    </InfiniteScroll>
  ) : (
    content
  );
}
