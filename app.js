// Important: DO NOT remove this `ErrorBoundary` component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="icon-circle-x text-6xl text-red-500 mb-4 mx-auto"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">We're sorry, but something unexpected happened while generating your QR code.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [qrConfig, setQrConfig] = React.useState({
    value: 'https://trickle.so',
    fgColor: '#000000',
    bgColor: '#ffffff',
    useGradient: false,
    gradientColor: '#2563eb',
    gradientType: 'linear', // 'linear', 'radial'
    margin: 4,
    width: 1024,
    logo: null,
    logoPadding: 5,
    logoSize: 0.2, // ratio
    qrLabel: 'QR Generator Pro',
    labelColor: '#111827',
    showLabel: true,
    cornerType: 'square', // 'square', 'rounded', 'circle'
    dotType: 'square' // 'square', 'dots'
  });

  const updateConfig = (newParams) => {
    setQrConfig(prev => ({ ...prev, ...newParams }));
  };

  try {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]" data-name="app-container" data-file="app.js">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column: Form */}
            <div className="w-full lg:w-7/12 xl:w-8/12">
              <QRForm config={qrConfig} onUpdate={updateConfig} />
            </div>

            {/* Right Column: Preview */}
            <div className="w-full lg:w-5/12 xl:w-4/12 sticky top-8">
              <QRPreview config={qrConfig} />
            </div>
          </div>

          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Features</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Generate high-quality, branded QR codes for any purpose. Perfect for marketing materials, business cards, and digital displays.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="icon-palette text-2xl"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Custom Branding</h3>
                <p className="text-gray-500 leading-relaxed">Add your logo and customize every color to match your brand identity perfectly.</p>
              </div>
              
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="icon-file-up text-2xl"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Print Quality</h3>
                <p className="text-gray-500 leading-relaxed">Export high-resolution PNG images up to 1024px, ideal for professional printing.</p>
              </div>
              
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="icon-shield-check text-2xl"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Privacy Secure</h3>
                <p className="text-gray-500 leading-relaxed">All generation happens in your browser. We never see or store your private data or URLs.</p>
              </div>

              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="icon-user text-2xl"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Creator Credit</h3>
                <p className="text-gray-500 leading-relaxed">Created by <span className="font-semibold text-gray-800">Ega Pradana Erlangga Najahi</span> with a feature-focused QR generator experience.</p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-4">
          <div className="icon-triangle-alert text-3xl"></div>
          <div>
            <h3 className="font-bold">Critical Error</h3>
            <p className="text-sm">The UI could not be rendered properly. Please refresh the page.</p>
          </div>
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);