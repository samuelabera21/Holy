function getGoogleDriveFileId(url) {
  if (!url || typeof url !== "string") {
    return null;
  }

  const byPathMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (byPathMatch?.[1]) {
    return byPathMatch[1];
  }

  const byQueryMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (byQueryMatch?.[1]) {
    return byQueryMatch[1];
  }

  return null;
}

function getGoogleDriveResourceKey(url) {
  if (!url || typeof url !== "string") {
    return null;
  }

  const resourceKeyMatch = url.match(/[?&]resourcekey=([^&#]+)/i);
  if (resourceKeyMatch?.[1]) {
    return decodeURIComponent(resourceKeyMatch[1]);
  }

  return null;
}

function getGoogleDriveDirectFileUrl(fileId) {
  if (!fileId) {
    return null;
  }

  return `https://drive.usercontent.google.com/u/0/uc?id=${fileId}&export=download&confirm=t`;
}

function getGoogleDriveInlineFileUrl(fileId) {
  if (!fileId) {
    return null;
  }

  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

export function getEmbeddablePdfUrl(pdfUrl) {
  if (!pdfUrl || typeof pdfUrl !== "string") {
    return pdfUrl;
  }

  const fileId = getGoogleDriveFileId(pdfUrl);
  if (!fileId) {
    return pdfUrl;
  }

  return getGoogleDriveInlineFileUrl(fileId);
}

export function getOpenPdfUrl(pdfUrl) {
  if (!pdfUrl || typeof pdfUrl !== "string") {
    return pdfUrl;
  }

  const fileId = getGoogleDriveFileId(pdfUrl);
  if (!fileId) {
    return pdfUrl;
  }

  return `https://drive.google.com/file/d/${fileId}/view`;
}

export function getDownloadPdfUrl(pdfUrl) {
  if (!pdfUrl || typeof pdfUrl !== "string") {
    return pdfUrl;
  }

  const fileId = getGoogleDriveFileId(pdfUrl);
  if (!fileId) {
    return pdfUrl;
  }

  const resourceKey = getGoogleDriveResourceKey(pdfUrl);
  if (!resourceKey) {
    return getGoogleDriveDirectFileUrl(fileId);
  }

  const params = new URLSearchParams({
    id: fileId,
    export: "download",
    confirm: "t",
    resourcekey: resourceKey
  });

  return `https://drive.usercontent.google.com/u/0/uc?${params.toString()}`;
}
