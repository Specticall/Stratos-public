export default function UserSales() {
  return (
    <article>
      <p className="">Average Pricing</p>
      <h2 className="mt-2 mb-8 text-light text-2xl font-semibold">
        IDR 2.500.000 ~ 5.000.000
      </h2>

      <div className="grid grid-cols-[auto_1fr] p-5 bg-slate-100 rounded-md gap-x-5 gap-y-2">
        <div className="">
          <i className="bx bx-money text-2xl bg-white w-14 h-14 rounded-full flex items-center justify-center text-light"></i>
        </div>
        <p className=" text-light leading-[150%] self-center">
          The value you see above was calculated based on your past 424
          transactions
        </p>
        <div></div>
        <p className="text-accent underline cursor-pointer transition-all duration-200 hover:opacity-50">
          I’m seeing inacurate price ranges
        </p>
      </div>
    </article>
  );
}
