import { type DiaryEntry } from "../types.ts";

const WeatherCards = ({
  entries,
}: {
  entries: DiaryEntry[];
}): React.JSX.Element => {
  return (
    <>
      <section>
        {entries.map((entry: DiaryEntry, index: number) => (
          <div key={index} className="weather-card">
            <h4>{entry.date}</h4>
            <div className="weather-visibility">
              <p>{entry.weather}</p>
              <p>{entry.visibility}</p>
            </div>
            <div className="comment">
              <p>{entry.comment}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default WeatherCards;
