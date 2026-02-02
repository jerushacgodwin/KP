export async function apiFetch<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data?: any,
  headers: Record<string, string> = {},
  isMultipart: boolean = false
): Promise<T> {
  let body: BodyInit | undefined;
  const finalHeaders: Record<string, string> = { ...headers };

  if (isMultipart && data) {
    const formData = new FormData();

    for (const key in data) {
      const value = data[key];

      if (value === undefined || value === null) continue;

      if (value instanceof File) {
        if (value.size > 0) {
          formData.append(key, value);
        }
      } else if (value instanceof FileList) {
        Array.from(value).forEach((file) => {
          if (file.size > 0) {
            formData.append(key, file);
          }
        });
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    }

    body = formData;
    // Don’t set Content-Type when using FormData
  } else if (data) {
    finalHeaders["Content-Type"] = "application/json";
    body = JSON.stringify(data);
  }


  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const fullUrl = url.startsWith("/") ? `${apiUrl}${url}` : url;

  const res = await fetch(fullUrl, {
    method,
    headers: finalHeaders,
    body: method !== "GET" ? body : undefined,
    credentials: 'include', // Ensure cookies are sent (critical for Electron/CORS)
    cache: 'no-store',
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    // Prefer specific debug 'error' or 'message' from server
    throw new Error(error?.error || error?.message || "API Error");
  }

  return res.json();
}
