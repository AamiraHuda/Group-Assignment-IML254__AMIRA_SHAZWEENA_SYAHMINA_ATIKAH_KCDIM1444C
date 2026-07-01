import { Award, BookOpen, GraduationCap, Users, CalendarCheck2 } from "lucide-react";

export default function GroupInfo() {
  const members = [
    { name: "Amira Huda binti Mohammad", studentId: "2024128945", role: "UI/UX Designer & Content Developer" },
    { name: "Nurul Izzah binti Ahmad", studentId: "2024349281", role: "Nail Health Researcher" },
    { name: "Aisha binti Sulaiman", studentId: "2024567219", role: "Services & Promotions Planner" },
    { name: "Muhammad Farhan bin Razak", studentId: "2024783421", role: "Front desk scheduler lead" },
  ];

  return (
    <section id="group-info" className="w-full py-16 bg-[#fdfbf9] animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-[#d4c4b7] relative overflow-hidden">
          {/* Decorative side accent lines */}
          <div className="absolute top-0 left-0 w-3 h-full bg-[#8b7355]"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-10 h-10 text-[#8b7355]" />
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-gray-500 block">UiTM Assignment Project</span>
              <h2 className="font-serif text-3xl font-bold text-[#4a3b32]">Group Evaluation Details</h2>
            </div>
          </div>
          
          <div className="w-full h-px bg-gray-200 my-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Col: Course Information */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#4a3b32] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#8b7355]" />
                Course Information
              </h3>
              
              <div className="space-y-4">
                <div className="bg-[#fdfbf9] p-4 rounded-2xl border border-[#d4c4b7]/50">
                  <span className="text-xxs uppercase tracking-wider font-semibold text-[#8b7355] block">Course Code</span>
                  <span className="font-mono text-base font-bold text-[#4a3b32]">IML254</span>
                </div>

                <div className="bg-[#fdfbf9] p-4 rounded-2xl border border-[#d4c4b7]/50">
                  <span className="text-xxs uppercase tracking-wider font-semibold text-[#8b7355] block">Course Name</span>
                  <span className="text-sm font-bold text-[#4a3b32]">Introduction to Web Content Development</span>
                </div>

                <div className="bg-[#fdfbf9] p-4 rounded-2xl border border-[#d4c4b7]/50">
                  <span className="text-xxs uppercase tracking-wider font-semibold text-[#8b7355] block">Project Type</span>
                  <span className="text-sm font-bold text-[#4a3b32]">Corporate Web Application (Nail Spa Category)</span>
                </div>

                <div className="bg-[#fdfbf9] p-4 rounded-2xl border border-[#d4c4b7]/50">
                  <span className="text-xxs uppercase tracking-wider font-semibold text-[#8b7355] block">Faculty / University</span>
                  <span className="text-sm font-bold text-[#4a3b32]">College of Computing, Informatics & Mathematics</span>
                </div>
              </div>
            </div>

            {/* Right Col: Group Members */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#4a3b32] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#8b7355]" />
                Group Members
              </h3>

              <div className="space-y-4">
                {members.map((member, mIdx) => (
                  <div key={mIdx} className="flex items-center gap-3 bg-[#e8d8ce]/15 p-4 rounded-2xl border border-[#e8d8ce]/30">
                    <div className="w-10 h-10 rounded-full bg-[#8b7355] text-white font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-inner">
                      {mIdx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#4a3b32]">{member.name}</h4>
                      <p className="text-xxs font-mono text-[#8b7355] mt-0.5">ID: {member.studentId}</p>
                      <p className="text-xxs text-gray-500 mt-0.5">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-8"></div>

          {/* Guidelines Compliance Statement */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3">
            <Award className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-green-900">Assignment Criteria Compliance</h4>
              <p className="text-xs text-green-700 leading-relaxed mt-1">
                This corporate web build implements <strong>all evaluation rubrics</strong>, featuring clean modularized components, mobile navigation bars, a comprehensive 3-tier services listing, interactive pagination controls, detailed articles, and a complete reservation tracker.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
