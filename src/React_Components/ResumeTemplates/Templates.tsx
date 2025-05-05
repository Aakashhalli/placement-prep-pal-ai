import React from "react";
import { MapPin, Mail } from "lucide-react";
const ResumePage = ({ children }) => (
  <div
    style={{
      width: "8.5in",
      minHeight: "11in",
      margin: "0 auto",
      padding: "0.5in",
      pageBreakAfter: "always",
      pageBreakInside: "avoid",
      boxSizing: "border-box"
    }}
  >
    {children}
  </div>
);


export const TemplateOne = ({ data }) => (
  <ResumePage>
    <div className="bg-white shadow overflow-hidden p-4">
      <header className="border-b pb-4 mb-4">
        <h1 className="text-4xl font-bold">
          {data.firstName} {data.lastName || ""}
        </h1>
        <p className="text-gray-600">
          {data.email} | {data.phoneNumber || "N/A"}
        </p>
        <p className="text-gray-600">
          {data.address?.city}, {data.address?.country} - {data.address?.pinCode}
        </p>
      </header>
      <div className="grid grid-cols-3 gap-12">
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Education</h2>
            {data.college ? (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-md font-medium">{data.college.name || 'N/A'}</h3>
                <p className="text-gray-600 text-sm">
                  {data.college.degree?.degreeName} in {data.college.degree?.field}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {data.college.graduation?.month} {data.college.graduation?.year}
                </p>
              </div>
            ) : (
              <p>No education details available.</p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Skills</h2>
            {data.skills?.length ? (
              <ul className="space-y-2">
                {data.skills.map((skill, index) => (
                  <li key={index} className="text-gray-700 text-sm before:content-['✓'] before:mr-2">
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No skills listed.</p>
            )}
          </section>
        </div>

        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Profile</h2>
            <p className="text-gray-700 leading-relaxed">{data.about || 'No profile summary.'}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Experience</h2>
            {data.previousJob ? (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-md font-medium">{data.previousJob.title || 'N/A'}</h3>
                <p className="text-gray-600">{data.previousJob.companyName || 'N/A'}</p>
                <p className="text-sm text-gray-500">
                  {data.previousJob.startDate?.startMonth} {data.previousJob.startDate?.startYear} - 
                  {data.previousJob.endDate?.endMonth} {data.previousJob.endDate?.endYear}
                </p>
              </div>
            ) : (
              <p>No experience listed.</p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Projects</h2>
            {data.projects?.length ? (
              <ul className="space-y-4">
                {data.projects.map((project, index) => (
                  <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-gray-700">{project.description}</p>
                    {project.link && (
                      <a href={project.link} className="text-blue-600 text-sm" target="_blank" rel="noopener noreferrer">
                        {project.link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No projects listed.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  </ResumePage>
);


export const TemplateTwo = ({ data }) => (
  <ResumePage>
    <div
      className="h-full bg-gradient-to-br from-purple-100 to-indigo-100 p-8"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <header className="flex items-center mb-8">
        <div className="w-32 h-32 bg-indigo-200 rounded-full mr-6 flex items-center justify-center">
          <span className="text-4xl">👤</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-indigo-900">
            {data.firstName || 'N/A'} <span className="text-indigo-600">{data.lastName || 'N/A'}</span>
          </h1>
          {data.previousJob && (
            <p className="text-indigo-700">
              {data.previousJob.title || 'N/A'} @ {data.previousJob.companyName || 'N/A'}
            </p>
          )}
        </div>
      </header>

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-2 space-y-6">
          {data.email || data.address ? (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">Contact</h2>
              <ul className="space-y-3">
                {data.email && (
                  <li className="flex items-center">
                    <span className="mr-2">📧</span>
                    {data.email}
                  </li>
                )}
                {data.address && (
                  <li className="flex items-center">
                    <span className="mr-2">📍</span>
                    {data.address.city || 'N/A'} - {data.address.pinCode || 'N/A'}, {data.address.country || 'N/A'}
                  </li>
                )}
              </ul>
            </div>
          ) : null}

          {data.skills?.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">Top Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-3 space-y-6">
          {data.about && (
            <div>
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{data.about}</p>
            </div>
          )}

          {data.previousJob && (
            <div>
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">Career Timeline</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-200 pl-4">
                  <h3 className="font-bold text-lg">{data.previousJob.title || 'N/A'}</h3>
                  <p className="text-indigo-600">{data.previousJob.companyName || 'N/A'}</p>
                  <p className="text-sm text-gray-500">
                    {data.previousJob?.startDate?.startMonth || 'N/A'} {data.previousJob?.startDate?.startYear || 'N/A'} -
                    {data.previousJob?.endDate?.endMonth || 'N/A'} {data.previousJob?.endDate?.endYear || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {data.projects?.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">Projects</h2>
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="text-indigo-600">{project.description}</p>
                    {project.link && (
                      <a href={project.link} className="text-blue-600 text-sm" target="_blank" rel="noopener noreferrer">
                        {project.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.college && (
            <div>
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">Education</h2>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold">{data.college.name || 'N/A'}</h3>
                <p className="text-indigo-600">
                  {data.college.degree?.degreeName || 'N/A'} in {data.college.degree?.field || 'N/A'}
                </p>
                <p className="text-sm text-gray-500">
                  Graduated (or expected): {data.college.graduation?.month || 'N/A'} {data.college.graduation?.year || 'N/A'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </ResumePage>
);

export const TemplateThree = ({ data }) => (
  <ResumePage>
    <div className="h-full p-12 space-y-8" style={{ fontFamily: "'Inter', sans-serif" }}>
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {data.firstName || 'N/A'} {data.lastName || 'N/A'}
        </h1>
        <div className="flex justify-center space-x-4 text-gray-500">
          {data.email && <p>{data.email}</p>}
          {data.email && data.address && <p>•</p>}
          {data.address && <p>{data.address.city || 'N/A'}, {data.address.country || 'N/A'}</p>}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 space-y-8">
          {data.college && (
            <section>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Education</h2>
              <div>
                <p className="font-semibold">{data.college.name || 'N/A'}</p>
                <p className="text-sm text-gray-600">
                  {data.college.degree?.degreeName || 'N/A'} in {data.college.degree?.field || 'N/A'}
                </p>
                <p className="text-xs text-gray-400">
                  {data.college.graduation?.month || 'N/A'} {data.college.graduation?.year || 'N/A'}
                </p>
              </div>
            </section>
          )}

          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Skills</h2>
              <ul className="space-y-2">
                {data.skills.map((skill, index) => (
                  <li key={index} className="text-sm text-gray-700 before:content-['–'] before:mr-2">{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="col-span-2 space-y-8">
          {data.about && (
            <section>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Profile</h2>
              <p className="text-gray-700 leading-relaxed max-w-2xl">{data.about}</p>
            </section>
          )}

          {data.previousJob && (
            <section>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Experience</h2>
              <div>
                <h3 className="font-semibold text-gray-900">{data.previousJob.title || 'N/A'}</h3>
                <p className="text-gray-600">{data.previousJob.companyName || 'N/A'}</p>
                <p className="text-sm text-gray-400">
                  {data.previousJob?.startDate?.startMonth || 'N/A'} {data.previousJob?.startDate?.startYear || 'N/A'} - 
                  {data.previousJob?.endDate?.endMonth || 'N/A'} {data.previousJob?.endDate?.endYear || 'N/A'}
                </p>
              </div>
            </section>
          )}

          {data.projects?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Projects</h2>
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-md">
                    <h3 className="font-bold">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                    {project.link && (
                      <a href={project.link} className="text-blue-600 text-sm" target="_blank" rel="noopener noreferrer">
                        {project.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  </ResumePage>
);


export const TemplateFour = ({ data }) => (
  <ResumePage>
    <div className="h-full p-8" style={{ fontFamily: "'Poppins', sans-serif", background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)" }}>
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">
          {data.firstName || 'N/A'} <span className="text-blue-600">{data.lastName || 'N/A'}</span>
        </h1>
        <div className="flex justify-center space-x-4 text-gray-600">
          {data.email && <p>✉️ {data.email}</p>}
          {data.email && data.address && <p>•</p>}
          {data.address && <p>📍 {data.address.city || 'N/A'}, {data.address.country || 'N/A'}</p>}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-8">
          {data.about && (
            <section>
              <h2 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{data.about}</p>
            </section>
          )}

          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">Core Competencies</h2>
              <div className="grid grid-cols-2 gap-4">
                {data.skills.map((skill, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg flex items-center">
                    <span className="text-blue-600 mr-2">✔️</span>
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-8">
          {data.previousJob && (
            <section>
              <h2 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">Professional Experience</h2>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-lg">{data.previousJob.title || 'N/A'}</h3>
                <p className="text-blue-600">{data.previousJob.companyName || 'N/A'}</p>
                <p className="text-sm text-gray-500">
                  {data.previousJob?.startDate?.startMonth || 'N/A'} {data.previousJob?.startDate?.startYear || 'N/A'} - 
                  {data.previousJob?.endDate?.endMonth || 'N/A'} {data.previousJob?.endDate?.endYear || 'N/A'}
                </p>
              </div>
            </section>
          )}

          {data.projects?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">Projects</h2>
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold">{project.title}</h3>
                    <p className="text-blue-600">{project.description}</p>
                    {project.link && (
                      <a href={project.link} className="text-blue-600 text-sm" target="_blank" rel="noopener noreferrer">
                        {project.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.college && (
            <section>
              <h2 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">Education</h2>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold">{data.college.name || 'N/A'}</h3>
                <p className="text-blue-600">
                  {data.college.degree?.degreeName || 'N/A'} in {data.college.degree?.field || 'N/A'}
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  </ResumePage>
);



export const TemplateFive = ({ data }) => (
  <ResumePage>
    <div 
      className="h-full p-8"
      style={{ 
        fontFamily: "'Montserrat', sans-serif",
        background: "radial-gradient(circle at top left, #f0f4ff, #ffffff)"
      }}
    >
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-2 bg-gradient-to-b from-blue-600 to-indigo-700 p-8 rounded-xl text-white">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {data.firstName || 'N/A'} {data.lastName || 'N/A'}
            </h1>
            <p className="text-sm opacity-80">{data.previousJob?.title || 'N/A'}</p>
          </header>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4">Contact</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                {data.email || 'N/A'}
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                {data.address?.city || 'N/A'}, {data.address?.country || 'N/A'}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-4">Skills</h2>
            <ul className="space-y-2">
              {data.skills?.length ? data.skills.map((skill, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-2" />
                  {skill}
                </li>
              )) : <p>N/A</p>}
            </ul>
          </section>
        </div>

        <div className="col-span-3 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">About Me</h2>
            <p className="text-gray-700 leading-relaxed">{data.about || 'N/A'}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Experience</h2>
            <div className="space-y-6">
              {data.previousJob ? (
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-lg">{data.previousJob.title}</h3>
                  <p className="text-indigo-600">{data.previousJob.companyName || 'N/A'}</p>
                  <p className="text-sm text-gray-500">
                    {data.previousJob.startDate?.startMonth || 'N/A'} {data.previousJob.startDate?.startYear || 'N/A'} - 
                    {data.previousJob.endDate?.endMonth || 'N/A'} {data.previousJob.endDate?.endYear || 'N/A'}
                  </p>
                </div>
              ) : <p>N/A</p>}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Projects</h2>
            <div className="space-y-6">
              {data.projects?.length ? data.projects.map((project, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  {project.link && (
                      <a href={project.link} className="text-blue-600 text-sm" target="_blank" rel="noopener noreferrer">
                        {project.link}
                      </a>
                    )}
                </div>
              )) : <p>N/A</p>}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Education</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold">{data.college?.name || 'N/A'}</h3>
              <p className="text-indigo-600">
                {data.college?.degree?.degreeName || 'N/A'} in {data.college?.degree?.field || 'N/A'}
              </p>
              <p className="text-sm text-gray-500">
                Graduated (or expected): {data.college?.graduation?.month || 'N/A'} {data.college?.graduation?.year || 'N/A'}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </ResumePage>
);

export const TemplateSix = ({ data }) => (
  <ResumePage>
    <div 
      className="h-full p-12"
      style={{ 
        fontFamily: "'Inter', sans-serif",
        background: "#fafafa"
      }}
    >
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">
          {data.firstName || 'N/A'} {data.lastName || 'N/A'}
        </h1>
        <p className="text-gray-600">{data.previousJob?.title || 'N/A'}</p>
      </header>

      <div className="grid grid-cols-3 gap-12">
        <div className="space-y-8">
          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
              Contact
            </h2>
            <ul className="space-y-2">
              <li className="text-gray-700">📧 {data.email || 'N/A'}</li>
              <li className="text-gray-700">📍 {data.address?.city || 'N/A'}, {data.address?.country || 'N/A'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
              Skills
            </h2>
            <ul className="space-y-2">
              {data.skills?.length ? data.skills.map((skill, index) => (
                <li key={index} className="text-gray-700">
                  • {skill}
                </li>
              )) : <p>N/A</p>}
            </ul>
          </section>
        </div>

        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{data.about || 'N/A'}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
            <div className="space-y-6">
              {data.previousJob ? (
                <div>
                  <h3 className="font-bold text-lg">{data.previousJob.title}</h3>
                  <p className="text-gray-600">{data.previousJob.companyName || 'N/A'}</p>
                  <p className="text-sm text-gray-400">
                    {data.previousJob.startDate?.startMonth || 'N/A'} {data.previousJob.startDate?.startYear || 'N/A'} - 
                    {data.previousJob.endDate?.endMonth || 'N/A'} {data.previousJob.endDate?.endYear || 'N/A'}
                  </p>
                </div>
              ) : <p>N/A</p>}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
            <div className="space-y-6">
              {data.projects?.length ? data.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  {project.link && (
                      <a href={project.link} className="text-blue-600 text-sm" target="_blank" rel="noopener noreferrer">
                        {project.link}
                      </a>
                    )}
                </div>
              )) : <p>N/A</p>}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
            <div>
              <h3 className="font-bold">{data.college?.name || 'N/A'}</h3>
              <p className="text-gray-600">
                {data.college?.degree?.degreeName || 'N/A'} in {data.college?.degree?.field || 'N/A'}
              </p>
              <p className="text-sm text-gray-400">
                Graduated (or expected): {data.college?.graduation?.month || 'N/A'} {data.college?.graduation?.year || 'N/A'}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </ResumePage>
);


export const TemplateSeven = ({ data }) => (
  <ResumePage>
    <div 
      className="h-full p-12 bg-white"
      style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
    >
      <header className="mb-16 text-center">
        <div className="inline-block mb-6">
          <h1 className="text-5xl font-black text-gray-900 leading-tight">
            {data.firstName || 'N/A'}
            <span className="text-blue-600">.</span>
            <br />
            {data.lastName || 'N/A'}
          </h1>
          <div className="h-2 w-24 bg-blue-600 mx-auto mt-2" />
        </div>
        <div className="flex justify-center space-x-6 text-gray-600">
          <p className="flex items-center">{<Mail className="w-4 h-4 text-blue-600"/> } { data.email || 'N/A'}</p>
          <p className="flex items-center">{<MapPin className="w-4 h-4 text-pink-600" />} {data.address?.city || 'N/A'}, {data.address?.country || 'N/A'}</p>
        </div>
      </header>

      <div className="grid grid-cols-5 gap-12">
        <div className="col-span-2 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-blue-600 mb-4">Core Skills</h2>
            <ul className="space-y-3">
              {data.skills?.length ? data.skills.map((skill, index) => (
                <li key={index} className="flex items-center bg-blue-50 p-3 rounded-lg">
                  <span className="text-blue-600 mr-2">▹</span>
                  {skill}
                </li>
              )) : <p>N/A</p>}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-blue-600 mb-4">Education</h2>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold">{data.college?.name || 'N/A'}</h3>
              <p className="text-blue-600 text-sm">
                {data.college?.degree?.degreeName || 'N/A'} in {data.college?.degree?.field || 'N/A'}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                {data.college?.graduation?.month || 'N/A'} {data.college?.graduation?.year || 'N/A'}
              </p>
            </div>
          </section>
        </div>

        <div className="col-span-3">
          
          <section className="mb-12">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Professional Journey</h2>
            {data.previousJob ? (
              <div className="relative pl-8 border-l-4 border-blue-100">
                <h3 className="text-lg font-bold">{data.previousJob.title}</h3>
                <p className="text-blue-600">{data.previousJob.companyName || 'N/A'}</p>
              </div>
            ) : <p>N/A</p>}
            
          </section>
          <section className="mb-4">
          <h2 className="text-xl font-semibold">About</h2>
          <p>{data.about}</p>

          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Projects</h2>
            {data.projects?.length ? data.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold">{project.title}</h3>
                <p className="text-gray-700">{project.description}</p>
                {project.link && (
                      <a href={project.link} className="text-blue-600 text-sm" target="_blank" rel="noopener noreferrer">
                        {project.link}
                      </a>
                    )}
              </div>
            )) : <p>N/A</p>}
          </section>
        </div>
      </div>
    </div>
  </ResumePage>
);


export const TemplateEight = ({ data }) => (
  <ResumePage>
    <div 
      className="h-full grid grid-cols-4 bg-gray-50"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      <div className="col-span-1 bg-gray-900 text-white p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {data.firstName || 'N/A'}
            <span className="text-blue-400">.</span>
          </h1>
          <p className="text-gray-400">{data.lastName || 'N/A'}</p>
        </header>

        <section className="mb-8">
          <h2 className="text-sm font-bold text-blue-400 mb-4">CONTACT</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="mr-2">📍</span>
              {data.address?.city || 'N/A'}, {data.address?.country || 'N/A'}
            </li>
            <li className="flex items-center">
              <span className="mr-2">📧</span>
              {data.email || 'N/A'}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-bold text-blue-400 mb-4">EXPERTISE</h2>
          <div className="space-y-3">
            {data.skills?.length ? data.skills.map((skill, index) => (
              <div 
                key={index}
                className="bg-gray-800 p-3 rounded-lg text-sm"
              >
                {skill}
              </div>
            )) : <p className="text-gray-400">N/A</p>}
          </div>
        </section>
      </div>

      <div className="col-span-3 p-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile</h2>
          <p className="text-gray-700 leading-relaxed max-w-2xl">{data.about || 'N/A'}</p>
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Experience</h2>
            {data.previousJob ? (
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-bold">{data.previousJob.title || 'N/A'}</h3>
                <p className="text-blue-600 text-sm">{data.previousJob.companyName || 'N/A'}</p>
                <p className="text-gray-500 text-xs mt-2">
                  {data.previousJob?.startDate?.startMonth || 'N/A'} {data.previousJob?.startDate?.startYear || 'N/A'} - 
                  {data.previousJob?.endDate?.endMonth || 'N/A'} {data.previousJob?.endDate?.endYear || 'N/A'}
                </p>
              </div>
            ) : <p className="text-gray-400">N/A</p>}
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
            {data.college ? (
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-bold">{data.college.name || 'N/A'}</h3>
                <p className="text-blue-600 text-sm">
                  {data.college.degree?.degreeName || 'N/A'} in {data.college.degree?.field || 'N/A'}
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  {data.college.graduation?.month || 'N/A'} {data.college.graduation?.year || 'N/A'}
                </p>
              </div>
            ) : <p className="text-gray-400">N/A</p>}
          </section>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Projects</h2>
          {data.projects?.length ? (
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow">
                  <h3 className="font-bold">{project.title || 'N/A'}</h3>
                  <p className="text-gray-600">{project.description || 'N/A'}</p>
                  {project.link && (
                      <a href={project.link} className="text-blue-600 text-sm" target="_blank" rel="noopener noreferrer">
                        {project.link}
                      </a>
                    )}
                </div>
              ))}
            </div>
          ) : <p className="text-gray-400">N/A</p>}
        </section>
      </div>
    </div>
  </ResumePage>
);

export const TemplateNine = ({ data }) => (
  <ResumePage>
    <div className="h-full p-12 bg-gradient-to-br from-indigo-50 to-purple-50">
    <header className="flex items-center justify-between mb-16">
        <div>
          <h1 className="text-5xl font-bold text-gray-900">
            {data.firstName || 'N/A'}
            <span className="text-purple-600">_</span>
          </h1>
          <p className="text-2xl text-gray-600">{data.lastName || 'N/A'}</p>
        </div>
        <div className="text-right">
          <p className="text-purple-600">{data.email || 'N/A'}</p>
          <p className="text-gray-600">
            {(data.address?.city || 'N/A')}, {(data.address?.country || 'N/A')}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Career Profile</h2>
            <p className="text-gray-700 leading-relaxed">{data.about || 'No summary available.'}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Experiences</h2>
            {data.previousJob ? (
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold">{data.previousJob.title || 'N/A'}</h3>
                <p className="text-purple-600">{data.previousJob.companyName || 'N/A'}</p>
                <p className="text-sm text-gray-500">
                  {data.previousJob.startDate?.startMonth} {data.previousJob.startDate?.startYear} - 
                  {data.previousJob.endDate?.endMonth} {data.previousJob.endDate?.endYear}
                </p>
              </div>
            ) : (
              <p>No experience listed.</p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
            {data.projects?.length ? (
              <ul className="space-y-4">
                {data.projects.map((project, index) => (
                  <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-gray-700">{project.description}</p>
                    {project.link && (
                      <a href={project.link} className="text-purple-600 text-sm" target="_blank" rel="noopener noreferrer">
                        {project.link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No projects listed.</p>
            )}
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Skills</h2>
            <ul className="space-y-3">
              {data.skills?.length ? (
                data.skills.map((skill, index) => (
                  <li key={index} className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                    <span className="text-purple-600 mr-2">◉</span>
                    {skill}
                  </li>
                ))
              ) : (
                <p>No skills listed.</p>
              )}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
            {data.college ? (
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold">{data.college.name || 'N/A'}</h3>
                <p className="text-purple-600 text-sm">
                  {data.college.degree?.degreeName} in {data.college.degree?.field}
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  {data.college.graduation?.month} {data.college.graduation?.year}
                </p>
              </div>
            ) : (
              <p>No education details available.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  </ResumePage>
);


export const TemplateTen = ({ data }) => (
  <ResumePage>
    <div className="h-full p-12 bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <header className="mb-16 text-center">
        <h1 className="text-6xl font-light text-gray-900 tracking-tight mb-2">
          {data.firstName || 'N/A'}
        </h1>
        <p className="text-2xl text-gray-500">{data.lastName || 'N/A'}</p>
        <div className="flex justify-center space-x-4 mt-4">
          <p className="text-gray-600">{data.email || 'N/A'}</p>
          <p className="text-gray-400">•</p>
          <p className="text-gray-600">{(data.address?.city || 'N/A')}, {(data.address?.country || 'N/A')}</p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-12">
        <div className="space-y-8">
          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Education</h2>
            {data.college ? (
              <div>
                <h3 className="font-medium">{data.college.name || 'N/A'}</h3>
                <p className="text-gray-600 text-sm">
                  {data.college.degree?.degreeName} in {data.college.degree?.field}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {data.college.graduation?.month} {data.college.graduation?.year}
                </p>
              </div>
            ) : (
              <p>No education details available.</p>
            )}
          </section>

          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Skills</h2>
            <ul className="space-y-2">
              {data.skills?.length ? (
                data.skills.map((skill, index) => (
                  <li key={index} className="text-gray-700 text-sm before:content-['–'] before:mr-2">{skill}</li>
                ))
              ) : (
                <p>No skills listed.</p>
              )}
            </ul>
          </section>
        </div>

        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Profile</h2>
            <p className="text-gray-700 leading-relaxed max-w-2xl">{data.about || 'No profile summary.'}</p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Experience</h2>
            {data.previousJob ? (
              <div>
                <h3 className="font-medium">{data.previousJob.title || 'N/A'}</h3>
                <p className="text-gray-600">{data.previousJob.companyName || 'N/A'}</p>
                <p className="text-sm text-gray-400">
                  {data.previousJob.startDate?.startMonth} {data.previousJob.startDate?.startYear} - 
                  {data.previousJob.endDate?.endMonth} {data.previousJob.endDate?.endYear}
                </p>
              </div>
            ) : (
              <p>No experience listed.</p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Projects</h2>
            {data.projects?.length ? (
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="font-medium">{project.title || 'N/A'}</h3>
                    <p className="text-gray-700">{project.description || 'N/A'}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        {project.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No projects listed.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  </ResumePage>
);


