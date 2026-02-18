import djangoLogo from "../assets/Django-Logo.png";

const skills = [
  {
    name: "Django",
    logo: djangoLogo,
    desc: "Building scalable backend systems and REST APIs."
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    desc: "Interactive frontend logic and modern web behaviour."
  },
  {
    name: "Laravel",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    desc: "Developing structured MVC web applications and backend services."
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    desc: "Component-based UI development with responsive design."
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    desc: "Database design, optimization, and complex querying."
  },
  {
    name: "Jira",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    desc: "Agile workflow management and issue tracking."
  }
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 px-6 bg-gradient-to-b from-slate-900 to-black"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center text-white mb-14">
          Skills & Tools
        </h2>

        <div
          className="
            grid gap-8
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="
                group
                relative
                rounded-2xl
                bg-slate-800/70
                backdrop-blur-lg
                border border-slate-700
                p-8
                transition-all duration-300
                hover:scale-105
                hover:border-blue-500
                hover:shadow-2xl hover:shadow-blue-500/20
              "
            >
              {/* Logo */}
              <div className="flex justify-center mb-6">
  <div
    className="
      w-20 h-20
      flex items-center justify-center
      rounded-xl
      bg-white/10
      backdrop-blur-md
      border border-white/10
      transition-all duration-300
      group-hover:bg-white/20
      group-hover:shadow-lg
    "
  >
    <img
      src={skill.logo}
      alt={skill.name}
      className="
        w-12 h-12 object-contain
        drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]
        transition-all duration-300
        group-hover:scale-110
      "
    />
  </div>
</div>


              {/* Title */}
              <h3 className="text-xl font-semibold text-center text-white">
                {skill.name}
              </h3>

              {/* Description */}
              <p
                className="
                  mt-3 text-sm text-slate-300 text-center
                  opacity-0 max-h-0 overflow-hidden
                  transition-all duration-300
                  group-hover:opacity-100
                  group-hover:max-h-40
                "
              >
                {skill.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
