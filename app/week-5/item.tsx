interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="bg-white p-4 rounded-md shadow-sm border-l-4 border-blue-500 mb-3">
      <p className="font-bold text-lg text-gray-800">{name}</p>
      <p className="text-sm text-gray-700 mt-2">
        <span className="font-semibold">Quantity:</span> {quantity}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Category:</span> <span className="capitalize">{category}</span>
      </p>
    </li>
  );
}
