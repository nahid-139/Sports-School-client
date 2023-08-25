const Button = ({ text }) => {
  return (
    <div>
      <button className="btn bg-secondary h-full !border-secondary hover:bg-white hover:text-primary text-white font-medium text-lg capitalize">
        {text}
      </button>
    </div>
  );
};

export default Button;
