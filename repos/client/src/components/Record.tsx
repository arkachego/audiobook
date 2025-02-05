import { RecordType } from "@/types";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

type Props = {
  record: RecordType;
  onPlay: (url: string) => void;
};

const Record: React.FC<Props> = ({ record, onPlay }) => {

  return (
    <Card className="m-2 p-0 cursor-pointer" onClick={() => onPlay(record.link)}>
      <CardContent className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-base font-semibold">{record.name}</div>
          <div className="text-xs text-neutral-400">{record.created_at}</div>
        </div>
      </CardContent>
    </Card>
  );

};

export default Record;
