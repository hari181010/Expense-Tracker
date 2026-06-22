const CategoryTable = ({ data }) => {

  if (!data || Object.keys(data).length === 0) {
    return (
      <p className="text-gray-500 mt-3">
        No data available
      </p>
    );
  }
  return (
    <table className="w-full mt-4 border border-gray-200">
      <thead className="bg-green-100">
        <tr>
          <th className="p-2 text-left text-gray-700">
            Category
          </th>
          <th className="p-2 text-right text-gray-700">
            Amount (₹)
          </th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(data).map(([category, amount]) => (
          <tr key={category} className="border-t">
            <td className="p-2 text-gray-600">
              {category}
            </td>
            <td className="p-2 text-right font-medium">
              {amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;