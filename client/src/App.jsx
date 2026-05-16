import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  CheckCircle2,
  ClipboardList,
  Clock3,
  ListChecks,
  LogOut,
  Mail,
  NotebookText,
  PanelLeft,
  Rocket,
  Sparkles,
  Trash2,
  Wand2
} from "lucide-react";
import { apiRequest } from "./lib/api.js";

const views = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "assistant", label: "AI Assistant", icon: Bot },
  { id: "tasks", label: "Task Board", icon: ClipboardList },
  { id: "notes", label: "Smart Notes", icon: NotebookText },
  { id: "email", label: "Email Writer", icon: Mail },
  { id: "workflow", label: "Workflow", icon: Wand2 }
];

const starterTasks = [
  { title: "Prepare hackathon demo script", priority: "High", status: "Pending", category: "Hackathon", estimateMinutes: 60 },
  { title: "Polish dashboard screens", priority: "Medium", status: "In Progress", category: "Design", estimateMinutes: 90 },
  { title: "Record walkthrough video", priority: "Medium", status: "Pending", category: "Submission", estimateMinutes: 45 }
];

function useAuth() {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("flowpilot_token");
    const user = localStorage.getItem("flowpilot_user");
    try {
      return token && user ? { token, user: JSON.parse(user) } : null;
    } catch (_error) {
      localStorage.removeItem("flowpilot_token");
      localStorage.removeItem("flowpilot_user");
      return null;
    }
  });

  function save(data) {
    localStorage.setItem("flowpilot_token", data.token);
    localStorage.setItem("flowpilot_user", JSON.stringify(data.user));
    setAuth(data);
  }

  function logout() {
    localStorage.removeItem("flowpilot_token");
    localStorage.removeItem("flowpilot_user");
    setAuth(null);
  }

  return { auth, save, logout };
}

function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("register");
  const [form, setForm] = useState({ name: "Demo User", email: "demo@flowpilot.ai", password: "password123" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = mode === "register" ? form : { email: form.email, password: form.password };
      const data = await apiRequest(`/auth/${mode}`, { method: "POST", body: JSON.stringify(payload) });
      onAuth(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-white">
      <div className="hero-grid absolute inset-0" />
      <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-100">
            <Sparkles size={16} /> Free-tier AI productivity OS
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight md:text-7xl">
            FlowPilot AI
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            A smart workspace for students, freelancers, and small teams: chat, tasks, notes,
            email generation, and workflow planning in one clean dashboard.
          </p>
          <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
            {["AI summaries", "Smart task flow", "Professional emails"].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <CheckCircle2 className="mb-3 text-emerald-300" size={22} />
                <p className="text-sm font-medium text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel relative z-10 p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-cyan-200">Start the demo</p>
              <h2 className="text-2xl font-semibold">{mode === "register" ? "Create workspace" : "Welcome back"}</h2>
            </div>
            <Rocket className="text-cyan-200" />
          </div>
          {mode === "register" && (
            <label className="field-label">
              Name
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
          )}
          <label className="field-label">
            Email
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="field-label">
            Password
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </label>
          {error && <p className="mb-4 rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-100">{error}</p>}
          <button className="primary-button w-full" disabled={loading}>
            {loading ? "Working..." : mode === "register" ? "Create account" : "Log in"}
          </button>
          <button type="button" className="mt-4 w-full text-sm text-slate-300 hover:text-white" onClick={() => setMode(mode === "register" ? "login" : "register")}>
            {mode === "register" ? "Already have an account? Log in" : "Need an account? Register"}
          </button>
        </motion.form>
      </section>
    </main>
  );
}

function Shell({ user, onLogout }) {
  const [view, setView] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    setError("");
    try {
      const [taskData, noteData] = await Promise.all([apiRequest("/tasks"), apiRequest("/notes")]);
      setTasks(taskData);
      setNotes(noteData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === "Completed").length;
    const rate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
    const score = Math.min(98, 55 + rate + Math.min(tasks.length * 3, 24));
    return { completed, rate, score, total: tasks.length };
  }, [tasks]);

  return (
    <main className="min-h-screen bg-ink text-white">
      <div className="app-bg fixed inset-0" />
      <div className="relative grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-white/10 bg-black/20 p-4 backdrop-blur-xl lg:border-b-0 lg:border-r">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-300 text-slate-950">
                <PanelLeft size={20} />
              </div>
              <div>
                <p className="font-semibold">FlowPilot AI</p>
                <p className="text-xs text-slate-400">Free-tier MERN</p>
              </div>
            </div>
          </div>
          <nav className="grid gap-2">
            {views.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.id} className={`nav-button ${view === item.id ? "active" : ""}`} onClick={() => setView(item.id)}>
                  <Icon size={18} /> {item.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-slate-400">{user.email}</p>
            <button className="mt-4 flex items-center gap-2 text-sm text-slate-300 hover:text-white" onClick={onLogout}>
              <LogOut size={16} /> Log out
            </button>
          </div>
        </aside>

        <section className="p-4 sm:p-6 lg:p-8">
          {error && <ErrorBanner message={error} onDismiss={() => setError("")} />}
          {view === "dashboard" && <Dashboard stats={stats} tasks={tasks} notes={notes} loading={loading} setView={setView} />}
          {view === "assistant" && <AIComposer feature="chat" title="AI Workspace Assistant" placeholder="Ask FlowPilot to plan, summarize, prioritize, or brainstorm..." />}
          {view === "tasks" && <Tasks tasks={tasks} setTasks={setTasks} />}
          {view === "notes" && <Notes notes={notes} setNotes={setNotes} />}
          {view === "email" && <AIComposer feature="email" title="AI Email Generator" placeholder="Example: Write an internship application email for a frontend role..." />}
          {view === "workflow" && <AIComposer feature="workflow" title="AI Workflow Suggestions" placeholder="Example: I am preparing for exams and internship applications..." />}
        </section>
      </div>
    </main>
  );
}

function Dashboard({ stats, tasks, notes, loading, setView }) {
  const cards = [
    { label: "Productivity score", value: `${stats.score}%`, icon: Sparkles },
    { label: "Completion rate", value: `${stats.rate}%`, icon: CheckCircle2 },
    { label: "Active tasks", value: stats.total, icon: ClipboardList },
    { label: "Completed", value: stats.completed, icon: Clock3 }
  ];

  return (
    <div>
      <Header eyebrow="Command center" title="Today's workflow cockpit" />
      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div className="metric-card" key={card.label}>
              <Icon className="text-cyan-200" size={22} />
              <p className="mt-4 text-3xl font-semibold">{card.value}</p>
              <p className="text-sm text-slate-400">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Quick AI actions">
          <div className="grid gap-3 sm:grid-cols-2">
            {views.slice(1).map((item) => {
              const Icon = item.icon;
              return (
                <button className="action-tile" key={item.id} onClick={() => setView(item.id)}>
                  <Icon size={20} /> {item.label}
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel title="Latest note">
          {notes[0] ? (
            <div>
              <p className="font-medium">{notes[0].title}</p>
              <p className="mt-3 line-clamp-5 text-sm leading-6 text-slate-300">{notes[0].summary}</p>
            </div>
          ) : (
            <EmptyState text="Paste lecture or meeting notes to generate summaries, action items, and flashcards." />
          )}
        </Panel>
      </div>

      <Panel title="Priority lane" className="mt-6">
        {loading ? <EmptyState text="Loading your workspace..." /> : tasks.length ? (
          <div className="grid gap-3 lg:grid-cols-3">
            {tasks.slice(0, 6).map((task) => <TaskCard key={task.id} task={task} compact />)}
          </div>
        ) : (
          <EmptyState text="No tasks yet. Add starter tasks from the Task Board to prepare your demo quickly." />
        )}
      </Panel>
    </div>
  );
}

function Tasks({ tasks, setTasks }) {
  const [form, setForm] = useState({ title: "", description: "", priority: "Medium", status: "Pending", category: "General", estimateMinutes: 45 });
  const [error, setError] = useState("");
  const columns = ["Pending", "In Progress", "Completed"];

  async function addTask(event) {
    event.preventDefault();
    if (!form.title.trim()) return;
    setError("");
    try {
      const task = await apiRequest("/tasks", { method: "POST", body: JSON.stringify(form) });
      setTasks([task, ...tasks]);
      setForm({ ...form, title: "", description: "" });
    } catch (err) {
      setError(err.message);
    }
  }

  async function updateTask(id, patch) {
    setError("");
    try {
      const updated = await apiRequest(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(patch) });
      setTasks(tasks.map((task) => (task.id === id ? updated : task)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTask(id) {
    setError("");
    try {
      await apiRequest(`/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  async function addStarterTasks() {
    setError("");
    try {
      const created = [];
      for (const task of starterTasks) {
        created.push(await apiRequest("/tasks", { method: "POST", body: JSON.stringify(task) }));
      }
      setTasks([...created, ...tasks]);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <Header eyebrow="Task automation" title="Smart task board" />
      {error && <ErrorBanner message={error} onDismiss={() => setError("")} />}
      <Panel title="Create task">
        <form onSubmit={addTask} className="grid gap-3 lg:grid-cols-[1.2fr_1fr_150px_150px_120px_120px]">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Task title" />
          <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
          <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" />
          <input type="number" min="5" step="5" value={form.estimateMinutes} onChange={(e) => setForm({ ...form, estimateMinutes: e.target.value })} aria-label="Estimate minutes" />
          <button className="primary-button">Add</button>
        </form>
        {!tasks.length && <button className="secondary-button mt-3" onClick={addStarterTasks}>Add demo tasks</button>}
      </Panel>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {columns.map((column) => (
          <Panel key={column} title={column}>
            <div className="grid min-h-64 gap-3">
              {tasks.filter((task) => task.status === column).map((task) => (
                <TaskCard key={task.id} task={task} onStatus={(status) => updateTask(task.id, { status })} onDelete={() => deleteTask(task.id)} />
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task, onStatus, onDelete, compact }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="font-medium">{task.title}</p>
        <div className="flex items-center gap-2">
          <span className={`pill ${task.priority.toLowerCase()}`}>{task.priority}</span>
          {!compact && onDelete && (
            <button className="icon-button" type="button" onClick={onDelete} aria-label={`Delete ${task.title}`}>
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>
      {task.description && <p className="mt-2 text-sm leading-6 text-slate-400">{task.description}</p>}
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
        <span className="rounded-md bg-white/5 px-2 py-1">{task.category}</span>
        <span className="rounded-md bg-white/5 px-2 py-1">{task.estimateMinutes} min</span>
      </div>
      {!compact && onStatus && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Pending", "In Progress", "Completed"].map((status) => (
            <button key={status} className="mini-button" onClick={() => onStatus(status)}>{status}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function Notes({ notes, setNotes }) {
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setLoading(true);
    setError("");
    try {
      const note = await apiRequest("/notes", { method: "POST", body: JSON.stringify(form) });
      setNotes([note, ...notes]);
      setForm({ title: "", content: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteNote(id) {
    setError("");
    try {
      await apiRequest(`/notes/${id}`, { method: "DELETE" });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <Header eyebrow="Smart notes" title="Summaries, actions, flashcards" />
      {error && <ErrorBanner message={error} onDismiss={() => setError("")} />}
      <Panel title="Paste notes">
        <form onSubmit={submit} className="grid gap-3">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Lecture or meeting title" />
          <textarea rows={7} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Paste notes here..." />
          <button className="primary-button justify-self-start" disabled={loading}>{loading ? "Summarizing..." : "Generate summary"}</button>
        </form>
      </Panel>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={() => deleteNote(note.id)} />
        ))}
      </div>
    </div>
  );
}

function NoteCard({ note, onDelete }) {
  return (
    <Panel
      title={
        <span className="flex items-start justify-between gap-3">
          <span>{note.title}</span>
          <button className="icon-button" type="button" onClick={onDelete} aria-label={`Delete ${note.title}`}>
            <Trash2 size={15} />
          </button>
        </span>
      }
    >
      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">{note.summary}</p>
      <StructuredList title="Key Points" items={note.keyPoints} />
      <StructuredList title="Action Items" items={note.actionItems} />
      {note.flashcards?.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-cyan-100">
            <ListChecks size={16} /> Flashcards
          </h3>
          <div className="grid gap-2">
            {note.flashcards.map((card, index) => (
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-3 text-sm" key={`${card.question}-${index}`}>
                <p className="font-medium text-slate-100">{card.question}</p>
                <p className="mt-1 leading-6 text-slate-400">{card.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Panel>
  );
}

function StructuredList({ title, items = [] }) {
  if (!items.length) return null;
  return (
    <div className="mt-5">
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-cyan-100">
        <ListChecks size={16} /> {title}
      </h3>
      <ul className="grid gap-2 text-sm text-slate-300">
        {items.map((item, index) => (
          <li className="rounded-md bg-white/[0.04] px-3 py-2 leading-6" key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function AIComposer({ feature, title, placeholder }) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [provider, setProvider] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setResult("");
    setError("");
    try {
      const data = await apiRequest(`/ai/${feature}`, {
        method: "POST",
        body: JSON.stringify({ prompt })
      });
      setResult(data.response || data.summary || "");
      setProvider(data.provider);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header eyebrow="AI generated" title={title} />
      {error && <ErrorBanner message={error} onDismiss={() => setError("")} />}
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Prompt">
          <form onSubmit={submit} className="grid gap-4">
            <textarea rows={10} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={placeholder} />
            <button className="primary-button justify-self-start" disabled={loading}>
              {loading ? "Generating..." : "Generate"}
            </button>
          </form>
        </Panel>
        <Panel title={provider ? `Result via ${provider}` : "Result"}>
          {result ? (
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-200">{result}</p>
          ) : (
            <EmptyState text="Your generated result will appear here." />
          )}
        </Panel>
      </div>
    </div>
  );
}

function Header({ eyebrow, title }) {
  return (
    <header className="mb-6">
      <p className="text-sm font-medium text-cyan-200">{eyebrow}</p>
      <h1 className="text-3xl font-semibold md:text-4xl">{title}</h1>
    </header>
  );
}

function Panel({ title, children, className = "" }) {
  return (
    <section className={`glass-panel p-5 ${className}`}>
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function EmptyState({ text }) {
  return (
    <div className="grid min-h-32 place-items-center rounded-lg border border-dashed border-white/10 bg-white/[0.03] p-6 text-center text-sm text-slate-400">
      {text}
    </div>
  );
}

function ErrorBanner({ message, onDismiss }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
      <span>{message}</span>
      <button className="text-red-100/80 hover:text-white" type="button" onClick={onDismiss}>Dismiss</button>
    </div>
  );
}

export default function App() {
  const { auth, save, logout } = useAuth();
  return auth ? <Shell user={auth.user} onLogout={logout} /> : <AuthScreen onAuth={save} />;
}
