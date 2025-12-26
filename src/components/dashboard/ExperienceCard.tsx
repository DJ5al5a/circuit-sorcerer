'use client'

interface Experience {
  title: string
  company: string
  period: string
  description: string[]
  technologies: string[]
}

interface ExperienceCardProps {
  experience: Experience
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="min-w-[300px] md:min-w-[400px] dashboard-card bg-surface-elevated">
      {/* Header */}
      <div className="mb-4 pb-4 border-b border-border">
        <h3 className="text-lg font-bold text-text-primary mb-1">
          {experience.title}
        </h3>
        <p className="text-primary font-mono text-sm">{experience.company}</p>
        <p className="text-text-tertiary text-xs mt-1">{experience.period}</p>
      </div>

      {/* Description */}
      <ul className="space-y-2 mb-4 text-sm text-text-secondary">
        {experience.description.map((item, index) => (
          <li key={index} className="flex gap-2">
            <span className="text-primary mt-1 flex-shrink-0">▹</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {experience.technologies.map((tech) => (
          <span key={tech} className="tag text-xs">
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
