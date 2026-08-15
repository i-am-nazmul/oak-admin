"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid credentials");
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", data.token, { httpOnly: true, path: "/" });

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/");
}

export async function signupAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  if (!email || !password) {
    throw new Error("Please provide all required fields");
  }

  const response = await fetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create account");
  }

  // After successful signup, redirect to login page
  redirect("/");
}

export async function addCreatorAction(formData: FormData) {
  const name = formData.get("name")?.toString();
  const images = formData.getAll("images") as File[];

  const hasImages = images.some(file => file.size > 0);

  if (!name || !hasImages) {
    throw new Error("Name and at least one Image are required");
  }

  const youtube = parseInt(formData.get("youtube")?.toString() || "0", 10);
  const linkedin = parseInt(formData.get("linkedin")?.toString() || "0", 10);
  const instagram = parseInt(formData.get("instagram")?.toString() || "0", 10);

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const payload = new FormData();
  payload.append("name", name);

  images.forEach((file) => {
    if (file.size > 0) {
      payload.append("images", file);
    }
  });

  payload.append("following", JSON.stringify({
    youtube,
    linkedin,
    instagram
  }));

  const response = await fetch('http://localhost:5000/api/creators', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: payload
  });

  let data;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    console.error("Non-JSON response from server:", text);
    data = { message: `Server returned an unexpected response (Status: ${response.status})` };
  }

  if (!response.ok) {
    throw new Error(data.message || "Failed to add creator");
  }

  redirect("/dashboard");
}
