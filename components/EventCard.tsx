type Props = {
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
};

export default function EventCard({
  title,
  description,
  category,
  date,
  location,
}: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="text-lg font-bold">{title}</h2>

      <p className="text-sm text-gray-600 mt-1">{description}</p>

      <div className="mt-3 text-sm space-y-1">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Location:</strong> {location}</p>
      </div>
    </div>
  );
}