export default function ResultCard({ place }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
      <div className="flex gap-4">
        {place.photos ? (
          <img
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
            alt={place.name}
            className="w-24 h-24 rounded object-cover"
          />
        ) : (
          <img
            src={place.icon}
            alt="default"
            className="w-16 h-16 rounded object-cover"
          />
        )}
        <div className="flex-1">
          <h2 className="font-bold text-lg">{place.name}</h2>
          <p className="text-sm text-gray-600">{place.formatted_address}</p>
          {place.rating && (
            <p className="text-yellow-500 font-medium">
              ⭐ {place.rating} ({place.user_ratings_total} reviews)
            </p>
          )}
          {place.opening_hours?.open_now && (
            <p className="text-green-600 font-semibold">Open Now</p>
          )}
        </div>
      </div>
    </div>
  );
}
