function Header() {
    return (
        <header className="bg-white border-b border-gray-100" data-name="header" data-file="components/Header.js">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = 'index.html'}>
                    <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center shadow-lg">
                        <div className="icon-qr-code text-2xl text-white"></div>
                    </div>
                    <div>
                        <span className="text-xl font-bold tracking-tight text-[var(--text-main)]">QR Generator</span>
                        <span className="text-xs font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded ml-1 uppercase">Pro</span>
                    </div>
                </div>
                
                <nav className="hidden md:flex items-center gap-6">
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-[var(--primary)] transition-colors">Templates</a>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-[var(--primary)] transition-colors">API</a>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-[var(--primary)] transition-colors">Business</a>
                </nav>

                <div className="flex items-center gap-3">
                    <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2">Sign In</button>
                    <button className="btn-primary text-sm">Get Started</button>
                </div>
            </div>
        </header>
    );
}