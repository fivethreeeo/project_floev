

interface Window {
  Kakao: any
  analytics: any
  gtag: Function
  wcs: any
  wcs_do: any
  gapi: any
}

function fbq(track: string, event: string): void;
function gtag_report_conversion(url: string): boolean;