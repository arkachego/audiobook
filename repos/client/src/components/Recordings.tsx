import { RecordType } from "@/types";
import Record from "./Record";
import Player from "./Player";
import { useState } from "react";

type Props = {
  records: RecordType[];
};

const Recordings: React.FC<Props> = ({ records }) => {

  const [ url, setUrl ] = useState<string>("");

  const onPlay = (url: string) => {
    setUrl(url);
  };

  return (
    <>
      <Player url={url}/>
      <div className="flex flex-col gap-0 p-2">
        {records.map(record => <Record key={record.id} record={record} onPlay={onPlay}/>)}
      </div>
    </>
  );

};

export default Recordings;
