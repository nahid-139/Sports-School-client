const PageTitle = ({ title }) => {
  return (
    <div className="bg-[url('https://i.ibb.co/Rj2rpb2/sports-banner-1.jpg')] lg:h-[450px] md:h-[300px] h-[200px]  md:-mt-20 flex items-end justify-center pb-20">
      <div className="bg-primary w-1/2 lg:py-20 py-5 bg-opacity-50 rounded-lg shadow-lg ">
        <h1 className="text-center uppercase lg:text-5xl md:text-3xl text-2xl font-oswald font-semibold text-white">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PageTitle;
