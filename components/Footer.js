function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12" data-name="footer" data-file="components/Footer.js">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-[var(--primary)] rounded flex items-center justify-center">
                                <div className="icon-qr-code text-white"></div>
                            </div>
                            <span className="text-lg font-bold">QR Generator Pro</span>
                        </div>
                        <p className="text-gray-500 text-sm max-w-sm mb-6">
                            The ultimate tool for creating professional, branded QR codes for your business. Fast, free, and secure.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://x.com/Trickle_HQ" target="_blank" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                                <div className="icon-twitter text-sm"></div>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                                <div className="icon-facebook text-sm"></div>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                                <div className="icon-linkedin text-sm"></div>
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-[var(--primary)]">Features</a></li>
                            <li><a href="#" className="hover:text-[var(--primary)]">API Access</a></li>
                            <li><a href="#" className="hover:text-[var(--primary)]">Pricing</a></li>
                            <li><a href="#" className="hover:text-[var(--primary)]">Custom Solutions</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-[var(--primary)]">Help Center</a></li>
                            <li><a href="#" className="hover:text-[var(--primary)]">Documentation</a></li>
                            <li><a href="#" className="hover:text-[var(--primary)]">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-[var(--primary)]">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
                    &copy; 2026 QR Generator Pro. Created by Ega Pradana Erlangga Najahi. All rights reserved. Built with ❤️ for professional creators.
                </div>
            </div>
        </footer>
    );
}