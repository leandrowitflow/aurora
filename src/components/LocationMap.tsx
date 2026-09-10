import Link from "next/link";
import { AURORA_LOCATION } from "@/lib/site-location";

type LocationMapProps = {
  locationName?: string;
  mapsUrl?: string;
  embedUrl?: string;
};

export function LocationMap({
  locationName = AURORA_LOCATION.name,
  mapsUrl = AURORA_LOCATION.mapsUrl,
  embedUrl = AURORA_LOCATION.embedUrl,
}: LocationMapProps) {
  return (
    <div className="location-map">
      <div className="location-map__frame">
        <iframe
          src={embedUrl}
          title={`Mapa — ${locationName}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="location-map__footer">
        <p className="body-text">{locationName}</p>
        <Link
          href={mapsUrl}
          className="location-map__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir no Google Maps
        </Link>
      </div>
    </div>
  );
}
