import MetricCard from "./MetricCard";

export default function index() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-3 lg:grid-cols-3 lg:gap-8">
      <MetricCard
        title="Application Security"
        score="5"
        scoreLetter="F"
        rateNumber="1"
      />
      <MetricCard
        title="Application Security"
        score="5"
        scoreLetter="F"
        rateNumber="1"
      />
    </div>
  );
}
