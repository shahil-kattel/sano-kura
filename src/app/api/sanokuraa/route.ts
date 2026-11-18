import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSanokuraaStore, saveSanokuraaStore } from "@/lib/sanokuraaServer";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const resource = searchParams.get("resource");
    const store = getSanokuraaStore();

    if (resource && resource in store) {
      return NextResponse.json({
        success: true,
        data: store[resource as keyof typeof store],
      });
    }

    return NextResponse.json({
      success: true,
      data: store,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load Sanokuraa data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, resource, data } = body;

    const currentStore = getSanokuraaStore();

    // 1. Submit project inquiry from public Services modal
    if (action === "submit_inquiry") {
      const newInquiry = {
        id: `inq-${Date.now()}`,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientPhone: data.clientPhone || "",
        serviceId: data.serviceId || "",
        serviceTitle: data.serviceTitle || "",
        projectScope: data.projectScope,
        budgetRange: data.budgetRange || "",
        createdAt: new Date().toISOString(),
        status: "NEW" as const,
      };

      const updatedInquiries = [newInquiry, ...currentStore.inquiries];
      saveSanokuraaStore({ inquiries: updatedInquiries });

      revalidatePath("/");
      revalidatePath("/admin");
      revalidatePath("/admin/settings");

      return NextResponse.json({
        success: true,
        message: "Inquiry submitted successfully",
        inquiry: newInquiry,
      });
    }

    // 2. Generic resource update
    if (resource && data) {
      const updatedStore = saveSanokuraaStore({
        [resource]: data,
      });

      // Revalidate public and admin paths
      revalidatePath("/");
      revalidatePath("/reporting");
      revalidatePath("/articles");
      revalidatePath("/photo-stories");
      revalidatePath("/admin");
      revalidatePath("/admin/quotes");
      revalidatePath("/admin/reporting");
      revalidatePath("/admin/articles");
      revalidatePath("/admin/reels");
      revalidatePath("/admin/photo-stories");
      revalidatePath("/admin/settings");

      return NextResponse.json({
        success: true,
        resource,
        data: updatedStore[resource as keyof typeof updatedStore],
      });
    }

    // 3. Full store replace
    if (data) {
      const saved = saveSanokuraaStore(data);
      revalidatePath("/");
      return NextResponse.json({ success: true, data: saved });
    }

    return NextResponse.json(
      { success: false, error: "Invalid payload or missing resource" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Sanokuraa API Mutation Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process mutation" },
      { status: 500 }
    );
  }
}
