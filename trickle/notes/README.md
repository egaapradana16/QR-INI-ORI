# QR Generator Pro - v2.0

A professional-grade QR code generator application built with React and Tailwind CSS.

## Features
- **Real-time Generation**: Instant feedback as you type or change styles.
- **Custom Branding**: Upload your logo with adjustable sizing and padding.
- **Color Gradients**: Support for linear and radial gradients in the QR pattern.
- **Dynamic Content**: Handles URLs, long text, and structured data.
- **High-Res Export**: Download options up to 2048px (Super High Res).
- **Tabbed Interface**: Organized workflow for Content, Design, Branding, and Advanced settings.
- **Privacy First**: Local browser processing; no data tracking.

## Technical Details
- **Error Correction**: Automatically switches to 'H' (High) level when logos are detected.
- **Library**: Powered by `qrcode.min.js` with custom Canvas post-processing.
- **Styling**: Tailwind CSS with custom theme variables.

## Maintenance Rules
- Update this README whenever new configuration parameters are added to `qrConfig` in `app.js`.
- Ensure `qrUtils.js` remains pure and doesn't depend on React state directly.