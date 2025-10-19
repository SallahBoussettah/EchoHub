export default function AboutStory() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="space-y-12">
          <div>
            <h2
              className="text-4xl font-black mb-6 text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Problem
            </h2>
            <p className="text-lg text-[var(--color-muted-ink)] leading-relaxed mb-4">
              As freelancers ourselves, we were drowning in tools. Gmail for
              emails, Notion for notes, Trello for tasks, Google Drive for
              files, spreadsheets for tracking... It was exhausting.
            </p>
            <p className="text-lg text-[var(--color-muted-ink)] leading-relaxed">
              We'd lose important client messages, miss deadlines, and waste
              hours searching for that one conversation from three weeks ago.
              The tools were supposed to help us stay organized, but they were
              making things worse.
            </p>
          </div>

          <div>
            <h2
              className="text-4xl font-black mb-6 text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Solution
            </h2>
            <p className="text-lg text-[var(--color-muted-ink)] leading-relaxed mb-4">
              We decided to build something different. Not another project
              management tool with a million features. Not another note-taking
              app. But a calm, focused workspace designed specifically for how
              freelancers actually work.
            </p>
            <p className="text-lg text-[var(--color-muted-ink)] leading-relaxed">
              EchoHub brings everything about a client into one place. With AI
              to help you make sense of it all. No complexity. No overwhelm.
              Just clarity and control.
            </p>
          </div>

          <div>
            <h2
              className="text-4xl font-black mb-6 text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our Mission
            </h2>
            <p className="text-lg text-[var(--color-muted-ink)] leading-relaxed">
              We believe freelancers deserve tools that respect their time and
              mental energy. Tools that reduce stress instead of adding to it.
              Tools that help them do their best work without getting in the
              way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
