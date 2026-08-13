import { useState, useRef, useEffect } from 'react';
import { jsQR } from 'jsqr';

// Real QR / barcode scanner using the device camera + jsQR.
export function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const streamRef = useRef(null);

  const stop = () => {
    setScanning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
  };

  const start = async () => {
    setError(''); setResult(''); setScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      requestAnimationFrame(tick);
    } catch (e) {
      setError('Camera access denied ya unavailable: ' + (e?.message || e));
      setScanning(false);
    }
  };

  const tick = () => {
    if (!scanning || !videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    if (video.readyState !== video.HAVE_ENOUGH_IMAGE_DATA) { rafRef.current = requestAnimationFrame(tick); return; }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    try {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    } catch { /* cross-origin frame draw blocked */ }
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(img.data, img.width, img.height, { inversionAttempts: 'attemptBoth' });
    if (code) {
      setResult(code.data || '');
      stop();
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  useEffect(() => {
    // cleanup on unmount
    return () => { stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {!scanning ? (
          <button onClick={start} className="btn-primary">Start Camera Scan</button>
        ) : (
          <button onClick={stop} className="btn-secondary">Stop Scan</button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
            <video ref={videoRef} playsInline muted className="rounded-lg border w-full" style={{ display: scanning ? 'block' : 'none' }} />
      <canvas ref={canvasRef} width={640} height={480} className="hidden" />
      {result && (
        <div className="space-y-2">
          <textarea readOnly value={result} className="input-field font-mono h-24 w-full" />
          <div className="flex gap-2">
            <button onClick={() => navigator.clipboard.writeText(result)} className="btn-secondary">Copy</button>
            <button onClick={() => { const a=document.createElement('a'); a.href='https://api.qrserver.com/v1/decode?data='+encodeURIComponent(result); a.download='qr.txt'; a.click(); }} className="btn-secondary">Download as TXT</button>
          </div>
        </div>
      )}
      {!scanning && !result && !error && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Camera khulne dena hoga. QR code ko frame ke andar rakhein.
        </p>
      )}
    </div>
  );
}
