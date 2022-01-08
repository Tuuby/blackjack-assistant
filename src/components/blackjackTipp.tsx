import React, { FunctionComponent } from "react";
import useSWR from "swr";

export type BlackjackTippProps = {
  bjtipp: string;
};

export const BlackjackTipp: FunctionComponent<BlackjackTippProps> = ({
  bjtipp,
}) => {
  const url =
    "hier könnte ihre URL stehen" + "dann die argumente irgendwie ranhängen";

  const { data, error } = useSWR(url);

  if (error) return <h1>Something went wrong!</h1>;
  if (!data) return <h1>Loading...</h1>;

  return (
    <div className="Card">
      <span className="Card--id">#{data.id}</span>
      <img
        className="Card--image"
        src={data.sprites.front_default}
        alt={bjtipp}
      ></img>
    </div>
  );
};
