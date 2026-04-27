export default function PageHeader({ title, subtitle, breadcrumb }) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {breadcrumb && (
          <div className="text-sm text-slate-500 mb-3">
            {breadcrumb}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-600 text-lg">{subtitle}</p>
        )}
        <div className="w-12 h-1 bg-slate-900 mt-4 rounded-full"></div>
      </div>
    </div>
  );
}