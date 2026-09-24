function QRPreview({ config }) {
    const [qrDataUrl, setQrDataUrl] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [toast, setToast] = React.useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    React.useEffect(() => {
        const updateQR = async () => {
            setLoading(true);
            try {
                const url = await generateQRCode(config);
                setQrDataUrl(url);
            } catch (err) {
                console.error(err);
                showToast('Failed to generate QR code', 'error');
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(updateQR, 400); // Debounce to prevent heavy re-renders
        return () => clearTimeout(timer);
    }, [config]);

    const handleDownload = () => {
        if (!qrDataUrl) return;
        downloadImage(qrDataUrl, `QR-Code-${Date.now()}.png`);
        showToast('QR Code downloaded successfully!');
    };

    const handleCopy = async () => {
        const success = await copyToClipboard(config.value);
        if (success) {
            showToast('Target content copied to clipboard!');
        }
    };

    return (
        <div className="space-y-6 relative" data-name="qr-preview" data-file="components/QRPreview.js">
            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-8 right-8 z-50 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-10 ${
                    toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-gray-900 text-white'
                }`}>
                    <div className={toast.type === 'error' ? 'icon-circle-x' : 'icon-circle-check'}></div>
                    <span className="text-sm font-semibold">{toast.message}</span>
                </div>
            )}

            <div className="card-container p-4 bg-white border border-gray-100 group">
                <div className="relative aspect-square w-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 group-hover:border-blue-200 transition-all overflow-hidden">
                    {loading ? (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm font-bold text-blue-600 animate-pulse uppercase tracking-widest">Generating...</span>
                        </div>
                    ) : qrDataUrl ? (
                        <div className="relative w-full h-full p-6">
                            <img 
                                src={qrDataUrl} 
                                alt="QR Preview" 
                                className="w-full h-full object-contain drop-shadow-sm"
                            />
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all flex items-center justify-center pointer-events-none">
                                <div className="w-16 h-16 bg-white/90 rounded-full shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                                    <div className="icon-search text-blue-600 text-2xl"></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-8 max-w-[200px]">
                            <div className="icon-qr-code text-6xl text-gray-200 mb-4 mx-auto"></div>
                            <p className="text-sm font-medium text-gray-400">Your professional preview will appear here</p>
                        </div>
                    )}
                </div>
            </div>

            {config.showLabel && config.qrLabel && (
                <div className="text-center -mt-2">
                    <span className="inline-block px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-700 shadow-sm" style={{ color: config.labelColor }}>
                        {config.qrLabel}
                    </span>
                </div>
            )}

            <div className="space-y-4">
                <button 
                    onClick={handleDownload}
                    disabled={!qrDataUrl || loading}
                    className="btn-primary w-full py-4 text-lg group active:scale-95"
                >
                    <div className="icon-download group-hover:-translate-y-1 transition-transform"></div>
                    Download PNG High-Res
                </button>
                
                <div className="flex gap-4">
                    <button 
                        onClick={handleCopy}
                        className="btn-outline flex-1 py-3 text-sm active:bg-blue-100"
                    >
                        <div className="icon-copy"></div>
                        Copy Data
                    </button>
                    <button className="btn-outline flex-1 py-3 text-sm hover:border-blue-400 hover:text-blue-500">
                        <div className="icon-share"></div>
                        Share
                    </button>
                </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <div className="icon-zap text-6xl"></div>
                </div>
                <div className="relative z-10">
                    <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <div className="icon-wand-sparkles text-xs"></div>
                        Pro Tip
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                        For maximum readability with logos, we use <span className="text-white">High Error Correction (30%)</span>. This allows up to 30% of the code to be covered while remaining functional.
                    </p>
                </div>
            </div>
        </div>
    );
}