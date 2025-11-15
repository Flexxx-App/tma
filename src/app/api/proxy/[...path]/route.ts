import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, "POST");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, "PUT");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, "DELETE");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, "PATCH");
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Cookie,Authorization,X-TMA",
      "Access-Control-Max-Age": "86400",
    },
  });
}

async function handleRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string,
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { error: "API URL not configured" },
      { status: 500 },
    );
  }

  // Join the path segments
  const path = params.path.join("/");

  // Construct the full URL - ensure apiUrl doesn't have a trailing slash
  const baseUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
  const pathWithSlash = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(pathWithSlash, baseUrl);

  // Copy query parameters
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Forward X-TMA header if present (used by Telegram Mini App auth)
    const tmaHeader = request.headers.get("x-tma");
    if (tmaHeader) {
      headers["X-TMA"] = tmaHeader;
    }

    // Forward authorization header if present
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    // Forward cookies if needed
    const cookie = request.headers.get("cookie");
    if (cookie) {
      headers["Cookie"] = cookie;
    }

    const body =
      method !== "GET" && method !== "DELETE"
        ? await request.text()
        : undefined;

    const response = await fetch(url.toString(), {
      method,
      headers,
      body,
    });

    const data = await response.text();
    let jsonData;

    try {
      jsonData = JSON.parse(data);
    } catch {
      jsonData = data;
    }

    return NextResponse.json(jsonData, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type,Cookie,Authorization,X-TMA",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy request" },
      { status: 500 },
    );
  }
}
