"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const id = formData.get("id");
  const password = formData.get("password");

  if (id === "apple" && password === "apple@123") {
    // Setup simple cookie auth
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    
    redirect("/admin");
  }

  return { error: "Invalid credentials" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth");
  redirect("/admin/login");
}
