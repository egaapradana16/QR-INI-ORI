function QRForm({ config, onUpdate }) {
    const [activeTab, setActiveTab] = React.useState('content');

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file' && files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                onUpdate({ [name]: event.target.result });
            };
            reader.readAsDataURL(files[0]);
        } else if (type === 'checkbox') {
            onUpdate({ [name]: checked });
        } else {
            const val = type === 'range' ? parseFloat(value) : value;
            onUpdate({ [name]: val });
        }
    };

    const tabs = [
        { id: 'content', label: 'Content', icon: 'icon-text-cursor' },
        { id: 'appearance', label: 'Design', icon: 'icon-palette' },
        { id: 'logo', label: 'Branding', icon: 'icon-image' },
        { id: 'advanced', label: 'Advanced', icon: 'icon-settings' }
    ];

    return (
        <div className="card-container flex flex-col min-h-[500px]" data-name="qr-form" data-file="components/QRForm.js">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-100 bg-gray-50/50">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all border-b-2 ${
                            activeTab === tab.id 
                            ? 'text-blue-600 border-blue-600 bg-white' 
                            : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <div className={`${tab.icon} text-lg`}></div>
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="p-6 md:p-8 flex-grow">
                {/* Content Tab */}
                {activeTab === 'content' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="section-title text-gray-800">
                            <div className="icon-link-2 text-blue-500"></div>
                            QR Content
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Target URL or Text Data</label>
                                <textarea 
                                    name="value"
                                    rows="4"
                                    value={config.value}
                                    onChange={handleChange}
                                    className="input-field resize-none"
                                    placeholder="Enter URL (e.g., https://google.com) or text message..."
                                />
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-3">
                                <div className="icon-info text-blue-500 mt-0.5"></div>
                                <p className="text-xs text-blue-700 leading-relaxed">
                                    Longer text will result in a more complex QR code pattern. Keep it concise for better scannability at small sizes.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Appearance Tab */}
                {activeTab === 'appearance' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="section-title text-gray-800">
                            <div className="icon-palette text-blue-500"></div>
                            Colors & Style
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700">QR Pattern Color</label>
                                <div className="flex items-center gap-3">
                                    <input type="color" name="fgColor" value={config.fgColor} onChange={handleChange} className="w-12 h-12 rounded-lg border-2 border-gray-100 cursor-pointer shadow-sm" />
                                    <input type="text" name="fgColor" value={config.fgColor} onChange={handleChange} className="flex-1 input-field font-mono uppercase" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700">Background Color</label>
                                <div className="flex items-center gap-3">
                                    <input type="color" name="bgColor" value={config.bgColor} onChange={handleChange} className="w-12 h-12 rounded-lg border-2 border-gray-100 cursor-pointer shadow-sm" />
                                    <input type="text" name="bgColor" value={config.bgColor} onChange={handleChange} className="flex-1 input-field font-mono uppercase" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-50">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" name="useGradient" checked={config.useGradient} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
                                    <span className="text-sm font-medium text-gray-700">Apply Color Gradient</span>
                                </label>
                            </div>
                            
                            {config.useGradient && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-xl animate-in zoom-in-95 duration-200">
                                    <div className="space-y-3">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Gradient To</label>
                                        <div className="flex items-center gap-2">
                                            <input type="color" name="gradientColor" value={config.gradientColor} onChange={handleChange} className="w-10 h-10 rounded-md border-0 p-0 overflow-hidden cursor-pointer" />
                                            <input type="text" name="gradientColor" value={config.gradientColor} onChange={handleChange} className="flex-1 input-field text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Direction</label>
                                        <select name="gradientType" value={config.gradientType} onChange={handleChange} className="input-field text-sm">
                                            <option value="linear">Linear (Top-Left to Bottom-Right)</option>
                                            <option value="radial">Radial (Center Out)</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Logo Tab */}
                {activeTab === 'logo' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="section-title text-gray-800">
                            <div className="icon-image text-blue-500"></div>
                            Logo Integration
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer relative">
                                <input 
                                    type="file" 
                                    name="logo"
                                    accept="image/*"
                                    onChange={handleChange}
                                    id="logo-upload"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                {config.logo ? (
                                    <div className="flex flex-col items-center">
                                        <img src={config.logo} alt="Current logo" className="h-20 w-20 object-contain rounded-lg shadow-md mb-4 bg-white" />
                                        <p className="text-sm font-medium text-blue-600">Click to replace logo</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="icon-cloud-upload text-4xl text-gray-300 mb-2 mx-auto"></div>
                                        <p className="text-sm font-medium text-gray-700">Drop your logo here or click to browse</p>
                                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG supported (Max 2MB)</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" name="showLabel" checked={config.showLabel} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
                                        <span className="text-sm font-medium text-gray-700">Show bottom text</span>
                                    </label>
                                </div>

                                {config.showLabel && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Bottom QR Text</label>
                                            <input type="text" name="qrLabel" value={config.qrLabel} onChange={handleChange} className="input-field" placeholder="QR Generator Pro" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                                            <div className="flex items-center gap-3">
                                                <input type="color" name="labelColor" value={config.labelColor} onChange={handleChange} className="w-12 h-12 rounded-lg border-2 border-gray-100 cursor-pointer shadow-sm" />
                                                <input type="text" name="labelColor" value={config.labelColor} onChange={handleChange} className="flex-1 input-field font-mono uppercase" />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {config.logo && (
                                <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Adjust Logo</h4>
                                        <button onClick={() => onUpdate({ logo: null })} className="text-xs font-bold text-red-500 hover:text-red-700">REMOVE LOGO</button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-medium text-gray-600">
                                                <span>Size (Relative)</span>
                                                <span>{Math.round(config.logoSize * 100)}%</span>
                                            </div>
                                            <input type="range" name="logoSize" min="0.1" max="0.3" step="0.01" value={config.logoSize} onChange={handleChange} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-medium text-gray-600">
                                                <span>Padding</span>
                                                <span>{config.logoPadding}px</span>
                                            </div>
                                            <input type="range" name="logoPadding" min="0" max="20" step="1" value={config.logoPadding} onChange={handleChange} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Advanced Tab */}
                {activeTab === 'advanced' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="section-title text-gray-800">
                            <div className="icon-settings text-blue-500"></div>
                            Technical Parameters
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700">Quiet Zone (Margin)</label>
                                    <span className="text-xs font-bold text-gray-500">{config.margin}px</span>
                                </div>
                                <input type="range" name="margin" min="0" max="20" step="1" value={config.margin} onChange={handleChange} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                <p className="text-[10px] text-gray-400">The whitespace border around the code.</p>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Resolution (Pixels)</label>
                                <select name="width" value={config.width} onChange={handleChange} className="input-field text-sm">
                                    <option value="256">256 x 256 (Small)</option>
                                    <option value="512">512 x 512 (Medium)</option>
                                    <option value="1024">1024 x 1024 (High Res)</option>
                                    <option value="2048">2048 x 2048 (Super High)</option>
                                </select>
                            </div>
                        </div>

                        <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg mt-8">
                            <div className="flex gap-3">
                                <div className="icon-triangle-alert text-orange-500 mt-0.5"></div>
                                <div className="text-xs text-orange-700 leading-relaxed">
                                    <span className="font-bold block mb-1">Scanning Advice:</span>
                                    Always test your QR code with a physical device before printing. Inverting colors (light foreground on dark background) may not be scannable by all apps.
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}