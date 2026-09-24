/**
 * Advanced QR Code Generator Utility
 * Support for: Logos, Gradients, Custom Labels, and High-Res Export
 */

const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
};

const generateQRCodeFallback = async (config) => {
    const { value, width, fgColor, bgColor, margin } = config;
    const safeValue = encodeURIComponent(value || 'https://trickle.so');
    const size = Math.max(256, Number(width) || 1024);
    const fg = (fgColor || '#000000').replace('#', '');
    const bg = (bgColor || '#ffffff').replace('#', '');
    const marginValue = Math.max(0, Number(margin) || 4);

    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${safeValue}&color=${fg}&bgcolor=${bg}&margin=${marginValue}&format=png`;
    return url;
};

const generateQRCode = async (config) => {
    try {
        const { 
            value, 
            fgColor, 
            bgColor, 
            margin, 
            width, 
            logo, 
            logoPadding, 
            logoSize: logoSizeRatio,
            useGradient,
            gradientColor,
            gradientType,
            qrLabel,
            labelColor,
            showLabel
        } = config;

        if (!window.QRCode || typeof window.QRCode.toCanvas !== 'function') {
            return generateQRCodeFallback(config);
        }

        const baseCanvas = document.createElement('canvas');
        await window.QRCode.toCanvas(baseCanvas, value, {
            width: width,
            margin: margin,
            color: {
                dark: fgColor,
                light: bgColor
            },
            errorCorrectionLevel: logo ? 'H' : 'M'
        });

        const baseCtx = baseCanvas.getContext('2d');

        if (useGradient) {
            baseCtx.globalCompositeOperation = 'source-in';
            let gradient;
            if (gradientType === 'linear') {
                gradient = baseCtx.createLinearGradient(0, 0, baseCanvas.width, baseCanvas.height);
            } else {
                gradient = baseCtx.createRadialGradient(
                    baseCanvas.width / 2, baseCanvas.height / 2, 0,
                    baseCanvas.width / 2, baseCanvas.height / 2, baseCanvas.width / 2
                );
            }
            gradient.addColorStop(0, fgColor);
            gradient.addColorStop(1, gradientColor);
            baseCtx.fillStyle = gradient;
            baseCtx.fillRect(0, 0, baseCanvas.width, baseCanvas.height);
            baseCtx.globalCompositeOperation = 'source-over';
        }

        if (logo) {
            const logoImage = new Image();
            await new Promise((resolve, reject) => {
                logoImage.onload = () => {
                    const finalLogoSize = baseCanvas.width * (logoSizeRatio || 0.2);
                    const x = (baseCanvas.width - finalLogoSize) / 2;
                    const y = (baseCanvas.height - finalLogoSize) / 2;
                    const pad = logoPadding || 5;
                    const rectX = x - pad;
                    const rectY = y - pad;
                    const rectW = finalLogoSize + pad * 2;
                    const rectH = finalLogoSize + pad * 2;

                    baseCtx.fillStyle = bgColor;
                    drawRoundedRect(baseCtx, rectX, rectY, rectW, rectH, pad > 0 ? pad : 5);
                    baseCtx.fill();
                    baseCtx.drawImage(logoImage, x, y, finalLogoSize, finalLogoSize);
                    resolve();
                };
                logoImage.onerror = () => reject(new Error('Failed to load logo image'));
                logoImage.src = logo;
            });
        }

        const finalCanvas = document.createElement('canvas');
        const labelHeight = showLabel && qrLabel ? Math.max(48, width * 0.09) : 0;
        const totalHeight = width + labelHeight + (showLabel && qrLabel ? 32 : 0);
        finalCanvas.width = width;
        finalCanvas.height = totalHeight;

        const finalCtx = finalCanvas.getContext('2d');
        finalCtx.fillStyle = bgColor;
        finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
        finalCtx.drawImage(baseCanvas, 0, 0, width, width);

        if (showLabel && qrLabel) {
            const textTop = width + 20;
            const textAreaWidth = width * 0.9;
            const textAreaHeight = labelHeight;
            const textAreaX = (width - textAreaWidth) / 2;
            const textAreaY = width + 12;

            finalCtx.fillStyle = bgColor;
            drawRoundedRect(finalCtx, textAreaX, textAreaY, textAreaWidth, textAreaHeight, 16);
            finalCtx.fill();

            finalCtx.fillStyle = labelColor || fgColor;
            finalCtx.textAlign = 'center';
            finalCtx.textBaseline = 'middle';
            finalCtx.font = `700 ${Math.max(18, width * 0.027)}px Arial, sans-serif`;
            finalCtx.fillText(qrLabel, width / 2, textTop + textAreaHeight / 2, textAreaWidth);
        }

        return finalCanvas.toDataURL('image/png');
    } catch (err) {
        console.error('QR Generation failed:', err);
        throw err;
    }
};

const downloadImage = (dataUrl, filename = 'qrcode.png') => {
    try {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (e) {
        console.error('Download failed', e);
    }
};

const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy: ', err);
        return false;
    }
};