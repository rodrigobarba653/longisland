import PortfolioGrid from "../components/sections/PortfolioGrid";
import { projects } from "../data/projects";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      <PortfolioGrid projects={projects} />
    </div>
  );
}

