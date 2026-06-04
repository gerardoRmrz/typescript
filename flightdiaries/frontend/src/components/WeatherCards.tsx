import { type DiaryEntry } from "../types.ts";

const WeatherCards = ({ entries }: { entries: DiaryEntry[] }) => {
  return (
    <>
      <section>
        {entries.map((entry: DiaryEntry) => (
          <div key={entry.id} className="weather-card">
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
