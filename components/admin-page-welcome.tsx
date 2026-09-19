export function AdminPageWelcome() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-[32px] font-bold leading-tight text-[#101828]">
          Welcome Back, Admin!
        </h2>
        <p className="mt-1 text-sm text-[#667085]">Manage Story Tree</p>
      </div>

      <div className="relative">
        <label className="sr-only" htmlFor="period-filter">
          Filter by period
        </label>
        <select
          id="period-filter"
          defaultValue="monthly"
          className="appearance-none rounded-[8px] border border-[#EAECF0] bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#667085]"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
