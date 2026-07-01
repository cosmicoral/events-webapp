import { Button } from "./ui/button";
import CityCombobox from "./CityCombobox";
import DateRangeFilter from "./DateRangeFilter";

export default function EventFilters({
  city, from, to, tag,
  cities, topTags,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-3">
      <section className="flex flex-row gap-3 pb-2 pl-3">
        <CityCombobox city={city} cities={cities} onChange={onChange} />
        <DateRangeFilter from={from} to={to} onChange={onChange} />
      </section>
      <section>
        {topTags.filter((t) => t !== "Undefined" && t !== "Other").map((tagName) => (
          <Button
            key={tagName}
            onClick={() => onChange({ tag: tag === tagName ? "" : tagName })}
            variant="secondary"
            className="mx-1 text-xl p-6 text-accent-foreground bg-accent font-bold rounded-full"
          >
            {tagName}
          </Button>
        ))}
      </section>
    </div>
  );
}