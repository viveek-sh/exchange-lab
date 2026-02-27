import { Mail, Github, Linkedin, Globe } from "lucide-react";
import Link from "next/link";

export default function ContactCard() {
  return (
    <section className="container max-w-4xl mx-auto px-6 pb-24 text-center">
      <div className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm p-10 shadow-sm transition-all">
        <h2 className="text-3xl font-semibold text-foreground mb-4">
          Let’s <span className="text-blue-500">Connect</span> & Discuss Systems
        </h2>

        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
          XCHG Lab is a learning-focused exchange project built to understand
          order books, matching engines, and trade execution at a deeper level.
          If you have feedback, questions, or want to talk about exchange
          internals, I’d be happy to connect.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-4">
          <Link
            href="mailto:in.viveksahu@gmail.com"
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card/20 px-4 py-2 text-sm text-blue-500 hover:text-blue-300 hover:bg-card/40 transition">
            <Mail className="w-4 h-4" /> Email
          </Link>

          <Link
            href="https://github.com/viveek-sh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card/20 px-4 py-2 text-sm text-blue-500 hover:text-blue-300 hover:bg-card/40 transition">
            <Github className="w-4 h-4" /> GitHub
          </Link>

          <Link
            href="https://www.linkedin.com/in/viveek-sh/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card/20 px-4 py-2 text-sm text-blue-500 hover:text-blue-300 hover:bg-card/40 transition">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </Link>

          <Link
            href="https://viveksahu.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card/20 px-4 py-2 text-sm text-blue-500 hover:text-indigo-300 hover:bg-card/40 transition">
            <Globe className="w-4 h-4" /> viveksahu.dev
          </Link>
        </div>

        <p className="text-sm text-muted-foreground mt-10 max-w-xl mx-auto">
          This project is experimental and not a production exchange. The core
          matching logic and order book implementation will remain open for
          learning and iteration as the system evolves.
        </p>
      </div>
    </section>
  );
}
