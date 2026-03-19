const GEMINI_PROBLEM_SOLUTION_OUTCOMES_IMG = new URL('../../assets/gemini-problem-solution-outcomes.png', import.meta.url).href

export default function ProblemSolutionOutcomesBlueprint() {
  return (
    <div className="rounded-2xl border border-[#1f3060] bg-[#060c18] overflow-hidden">
      <img
        src={GEMINI_PROBLEM_SOLUTION_OUTCOMES_IMG}
        alt="Executive problem statement, unified solution framework, and outcomes blueprint"
        className="block w-full h-auto object-contain"
        loading="lazy"
      />
    </div>
  )
}

