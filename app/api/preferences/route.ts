import Preferences from "@/app/models/preferences";
import { getPageSession } from "../../auth/lucia";

import { NextResponse, type NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const session = await getPageSession();
  if (!session) {
    return new Response(null, {
      status: 401
    });
  }
  const formData = await request.formData();
  const clef = formData.get('clef') as string | null;
  const majorKeys = formData.getAll('major') as string[] | null;
  const nMinorKeys = formData.getAll('natural minor') as string[] | null;
  const hMinorKeys = formData.getAll('harmonic minor') as string[] | null;
  const mMinorKeys = formData.getAll('melodic minor') as string[] | null;
  try {
    await Preferences.updateOne({ user_id: session.user.userId }, {
      clef: clef,
      major_keys: majorKeys,
      n_minor_keys: nMinorKeys,
      h_minor_keys: hMinorKeys,
      m_minor_keys: mMinorKeys,
    },
    {
      upsert: true
    })
    return new Response('successfully updated preferences', {
			status: 302
		});
  } catch (e) {
    return NextResponse.json(
    {
      error: "Error updating user preferences"
    }, {
      status: 500
    });
  }
}