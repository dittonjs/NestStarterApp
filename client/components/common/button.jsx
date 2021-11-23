export const Button = ({ children, ...other }) => {
  return (
    <button className="bg-gray-600 pt-2 pb-2 pr-4 pl-4 rounded-lg font-bold text-white" {...other}>
      {children}
    </button>
  );
};
