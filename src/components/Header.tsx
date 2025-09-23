import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-8">
            <Link to="/">
              <h1 className="text-xl font-bold text-slate-800 cursor-pointer">
                Machine Dashboard
              </h1>
            </Link>
            {/* <Link to="/slideshow">
              <h1 className="text-lg font-medium text-slate-600 hover:text-slate-800 cursor-pointer">
                Slideshow
              </h1>
            </Link> */}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium text-slate-600">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
