const SummaryCard = ({ title, subtitle, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-full">

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>

        {subtitle && (
          <p className="text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      <div>
        {children}
      </div>

    </div>
  );
};

export default SummaryCard;