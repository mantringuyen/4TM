import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { CopyButton, DownloadButton, ResetButton } from '../common/ActionButtons';
import {
  QrCode,
  Link2,
  FileText,
  Wifi,
  Mail,
  UserSquare2,
  MapPin,
  Download,
  Image as ImageIcon,
  ShieldCheck,
  Check,
  Copy,
  Sparkles,
} from 'lucide-react';
import QRCode from 'qrcode';

interface QrGeneratorToolProps {
  language: Language;
}

type QrContentType = 'url' | 'text' | 'wifi' | 'email' | 'vcard' | 'geo';

export const QrGeneratorTool: React.FC<QrGeneratorToolProps> = ({ language }) => {
  const dict = TRANSLATIONS[language];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Content Mode
  const [contentType, setContentType] = useState<QrContentType>('url');

  // Fields
  const [url, setUrl] = useState<string>('https://study.4tm.io.vn');
  const [plainText, setPlainText] = useState<string>('Welcome to 4TM Tools — Free & Private Utilities');
  
  // Wi-Fi fields
  const [wifiSsid, setWifiSsid] = useState<string>('4TM_Guest_Network');
  const [wifiPassword, setWifiPassword] = useState<string>('studywith4tm');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = useState<boolean>(false);

  // Email fields
  const [emailTo, setEmailTo] = useState<string>('contact@4tm.io.vn');
  const [emailSubject, setEmailSubject] = useState<string>('Inquiry about 4TM Study');
  const [emailBody, setEmailBody] = useState<string>('Hello,\nI would like more information regarding the courses.');

  // vCard fields
  const [vcardFirst, setVcardFirst] = useState<string>('Tri');
  const [vcardLast, setVcardLast] = useState<string>('Nguyen');
  const [vcardPhone, setVcardPhone] = useState<string>('+84 901 234 567');
  const [vcardEmail, setVcardEmail] = useState<string>('tri@4tm.io.vn');
  const [vcardOrg, setVcardOrg] = useState<string>('4TM Ecosystem');
  const [vcardTitle, setVcardTitle] = useState<string>('Lead Instructor');
  const [vcardUrl, setVcardUrl] = useState<string>('https://4tm.io.vn');

  // Geo fields
  const [geoLat, setGeoLat] = useState<string>('10.7769');
  const [geoLng, setGeoLng] = useState<string>('106.7009');

  // Styling & Customization
  const [fgColor, setFgColor] = useState<string>('#0f172a');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [transparentBg, setTransparentBg] = useState<boolean>(false);
  const [qrSize, setQrSize] = useState<number>(360);
  const [qrMargin, setQrMargin] = useState<number>(2);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  // Center Logo
  const [logoImgData, setLogoImgData] = useState<string | null>(null);
  const [copiedImage, setCopiedImage] = useState<boolean>(false);
  const [svgContent, setSvgContent] = useState<string>('');

  // Assemble Payload String
  const qrPayload = React.useMemo(() => {
    switch (contentType) {
      case 'url':
        return url.trim() || 'https://4tm.io.vn';

      case 'text':
        return plainText;

      case 'wifi': {
        const h = wifiHidden ? 'H:true;' : '';
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};${h};`;
      }

      case 'email': {
        const query = new URLSearchParams();
        if (emailSubject) query.set('subject', emailSubject);
        if (emailBody) query.set('body', emailBody);
        const qStr = query.toString();
        return `mailto:${emailTo}${qStr ? '?' + qStr : ''}`;
      }

      case 'vcard':
        return `BEGIN:VCARD
VERSION:3.0
N:${vcardLast};${vcardFirst};;;
FN:${vcardFirst} ${vcardLast}
ORG:${vcardOrg}
TITLE:${vcardTitle}
TEL:${vcardPhone}
EMAIL:${vcardEmail}
URL:${vcardUrl}
END:VCARD`;

      case 'geo':
        return `geo:${geoLat},${geoLng}?q=${geoLat},${geoLng}`;

      default:
        return url;
    }
  }, [
    contentType,
    url,
    plainText,
    wifiSsid,
    wifiPassword,
    wifiEncryption,
    wifiHidden,
    emailTo,
    emailSubject,
    emailBody,
    vcardFirst,
    vcardLast,
    vcardPhone,
    vcardEmail,
    vcardOrg,
    vcardTitle,
    vcardUrl,
    geoLat,
    geoLng,
  ]);

  // Generate QR Canvas & SVG
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const actualErrorLevel = logoImgData ? 'H' : errorLevel;
    const lightColor = transparentBg ? '#00000000' : bgColor;

    QRCode.toCanvas(
      canvas,
      qrPayload || ' ',
      {
        width: qrSize,
        margin: qrMargin,
        color: {
          dark: fgColor,
          light: lightColor,
        },
        errorCorrectionLevel: actualErrorLevel,
      },
      (err) => {
        if (err) {
          console.warn('QR Code generation error:', err);
          return;
        }

        // Overlay Center Logo if provided
        if (logoImgData) {
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          const img = new Image();
          img.onload = () => {
            const logoSize = Math.floor(qrSize * 0.22);
            const x = (qrSize - logoSize) / 2;
            const y = (qrSize - logoSize) / 2;

            // Draw white pill background for logo clarity
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.roundRect(x - 4, y - 4, logoSize + 8, logoSize + 8, 8);
            ctx.fill();

            // Draw logo
            ctx.drawImage(img, x, y, logoSize, logoSize);
          };
          img.src = logoImgData;
        }
      }
    );

    // Also produce SVG representation
    QRCode.toString(
      qrPayload || ' ',
      {
        type: 'svg',
        margin: qrMargin,
        color: {
          dark: fgColor,
          light: lightColor,
        },
        errorCorrectionLevel: actualErrorLevel,
      },
      (err, string) => {
        if (!err && string) {
          setSvgContent(string);
        }
      }
    );
  }, [qrPayload, qrSize, qrMargin, fgColor, bgColor, transparentBg, errorLevel, logoImgData]);

  // Download PNG
  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode-4tm-${contentType}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download SVG
  const handleDownloadSvg = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode-4tm-${contentType}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy PNG image to clipboard
  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2000);
      });
    } catch {
      alert('Image copy to clipboard is not supported in this browser.');
    }
  };

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setLogoImgData(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const contentTabs: { id: QrContentType; label: string; icon: any }[] = [
    { id: 'url', label: 'URL / Link', icon: Link2 },
    { id: 'text', label: 'Plain Text', icon: FileText },
    { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'vcard', label: 'vCard Contact', icon: UserSquare2 },
    { id: 'geo', label: 'Location (Geo)', icon: MapPin },
  ];

  return (
    <div className="space-y-6">
      {/* Content Type Selector Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        {contentTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setContentType(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                contentType === tab.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/40'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Input Form + Preview & Export */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Content Fields & Customization */}
        <div className="lg:col-span-6 space-y-5">
          {/* Content Inputs */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Content Information
            </h3>

            {/* URL Input */}
            {contentType === 'url' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://study.4tm.io.vn"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            {/* Plain Text Input */}
            {contentType === 'text' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Text Content
                </label>
                <textarea
                  value={plainText}
                  onChange={(e) => setPlainText(e.target.value)}
                  placeholder="Enter message or raw data..."
                  rows={4}
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>
            )}

            {/* Wi-Fi Inputs */}
            {contentType === 'wifi' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Network Name (SSID)
                  </label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="MyHomeWifi"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Password
                  </label>
                  <input
                    type="text"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    placeholder="Wifi password"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Encryption
                    </label>
                    <select
                      value={wifiEncryption}
                      onChange={(e) => setWifiEncryption(e.target.value as any)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs"
                    >
                      <option value="WPA">WPA / WPA2 / WPA3</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None (Open)</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-5">
                    <input
                      id="wifi-hidden"
                      type="checkbox"
                      checked={wifiHidden}
                      onChange={(e) => setWifiHidden(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer mr-2"
                    />
                    <label htmlFor="wifi-hidden" className="text-xs font-medium cursor-pointer">
                      Hidden SSID
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Email Inputs */}
            {contentType === 'email' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Recipient Address
                  </label>
                  <input
                    type="email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Subject..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Body Message
                  </label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows={3}
                    placeholder="Message..."
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>
              </div>
            )}

            {/* vCard Inputs */}
            {contentType === 'vcard' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={vcardFirst}
                      onChange={(e) => setVcardFirst(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={vcardLast}
                      onChange={(e) => setVcardLast(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={vcardPhone}
                      onChange={(e) => setVcardPhone(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={vcardEmail}
                      onChange={(e) => setVcardEmail(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={vcardOrg}
                      onChange={(e) => setVcardOrg(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={vcardTitle}
                      onChange={(e) => setVcardTitle(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Geo Inputs */}
            {contentType === 'geo' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={geoLat}
                    onChange={(e) => setGeoLat(e.target.value)}
                    placeholder="10.7769"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={geoLng}
                    onChange={(e) => setGeoLng(e.target.value)}
                    placeholder="106.7009"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* QR Design & Color Customization */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Style & Colors
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Foreground
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer bg-transparent"
                  />
                  <span className="font-mono text-xs">{fgColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    disabled={transparentBg}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer bg-transparent disabled:opacity-40"
                  />
                  <span className="font-mono text-xs">{transparentBg ? 'Transparent' : bgColor}</span>
                </div>
              </div>

              <div className="flex items-center pt-5">
                <input
                  id="trans-bg"
                  type="checkbox"
                  checked={transparentBg}
                  onChange={(e) => setTransparentBg(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer mr-2"
                />
                <label htmlFor="trans-bg" className="text-xs font-medium cursor-pointer">
                  Transparent BG
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Size ({qrSize}px)</span>
                </div>
                <input
                  type="range"
                  min="160"
                  max="600"
                  step="20"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Margin ({qrMargin} blocks)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={qrMargin}
                  onChange={(e) => setQrMargin(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            {/* Error Correction & Optional Logo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Error Correction Level
                </label>
                <select
                  value={logoImgData ? 'H' : errorLevel}
                  disabled={!!logoImgData}
                  onChange={(e) => setErrorLevel(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <option value="L">L (7% recovery)</option>
                  <option value="M">M (15% recovery)</option>
                  <option value="Q">Q (25% recovery)</option>
                  <option value="H">H (30% recovery - Recommended for Logos)</option>
                </select>
                {logoImgData && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                    Locked to High (H) because center logo is active.
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {dict.common.logo}
                </label>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750 shadow-sm">
                    <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>Choose Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>

                  {logoImgData && (
                    <button
                      type="button"
                      onClick={() => setLogoImgData(null)}
                      className="text-xs text-rose-500 hover:underline cursor-pointer"
                    >
                      Remove Logo
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live QR Preview Canvas & Exports */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-emerald-500" />
              <span>Static Vector QR Output</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Permanent &bull; No Redirects
            </span>
          </div>

          {/* QR Canvas Container */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-inner max-w-full overflow-hidden">
            <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg" />
          </div>

          {/* Export Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 w-full">
            <button
              type="button"
              onClick={handleDownloadPng}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{dict.common.exportPng}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadSvg}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{dict.common.exportSvg}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyImage}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              {copiedImage ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedImage ? 'Copied Image!' : 'Copy Image'}</span>
            </button>
          </div>

          {/* Static QR Notice */}
          <div className="mt-6 text-[11px] text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-emerald-500 inline-block mr-1 -mt-0.5" />
            Static QR codes encode data directly into the black and white pixel matrix. They work completely offline, never expire, and have no middleman servers.
          </div>
        </div>
      </div>
    </div>
  );
};
