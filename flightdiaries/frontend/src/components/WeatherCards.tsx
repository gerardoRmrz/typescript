import { type DiaryEntry } from "../types.ts";

const WeatherCards = ({
  entries,
}: {
  entries: DiaryEntry[];
}): React.JSX.Element => {
  return (
    <>
      <section id="card-container">
        {entries.map((entry: DiaryEntry, index: number) => (
          <div key={index} className="weather-card">
            <h4>{entry.date}</h4>
            <div className="weather-visibility-container">
              <p id="weather-p">{entry.weather}</p>
              <p id="visibility-p">{entry.visibility}</p>
            </div>
            <div className="comment-container">
              <p id="comment-p">{entry.comment}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default WeatherCards;
