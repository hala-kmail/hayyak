import { NextRequest, NextResponse } from 'next/server';
import { hashFingerprint, isValidFingerprint } from '@/lib/fingerprint';
import { checkFingerprintExists, storeFingerprint } from '@/lib/redis';
import { checkFingerprintInDb, storeVote } from '@/lib/db';

/**
 * POST /api/votes
 * Submit a vote for a neighborhood
 * 
 * Request body:
 * {
 *   townId: string,
 *   fingerprint: string (visitorId from FingerprintJS)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { townId, fingerprint } = body;

    // Validate input
    if (!townId || typeof townId !== 'string') {
      return NextResponse.json(
        { error: 'townId is required and must be a string' },
        { status: 400 }
      );
    }

    if (!fingerprint || !isValidFingerprint(fingerprint)) {
      return NextResponse.json(
        { error: 'Valid fingerprint is required' },
        { status: 400 }
      );
    }

    // Hash the fingerprint for privacy
    const fingerprintHash = hashFingerprint(fingerprint);

    // Check Redis first (fast check)
    const existsInRedis = await checkFingerprintExists(fingerprintHash);

    if (existsInRedis) {
      return NextResponse.json(
        { error: 'لقد قمت بالتصويت مسبقاً من هذا الجهاز.' },
        { status: 409 } // Conflict
      );
    }

    // Double-check in database (source of truth)
    const existsInDb = await checkFingerprintInDb(fingerprintHash);

    if (existsInDb) {
      // Store in Redis for future fast checks
      await storeFingerprint(fingerprintHash);
      return NextResponse.json(
        { error: 'لقد قمت بالتصويت مسبقاً من هذا الجهاز.' },
        { status: 409 } // Conflict
      );
    }

    // Store vote in database
    try {
      await storeVote(townId, fingerprintHash);
    } catch (error: any) {
      // Check if it's a duplicate vote error
      if (error.message === 'DUPLICATE_VOTE') {
        // Store in Redis for future fast checks
        await storeFingerprint(fingerprintHash);
        return NextResponse.json(
          { error: 'لقد قمت بالتصويت مسبقاً من هذا الجهاز.' },
          { status: 409 } // Conflict
        );
      }
      throw error; // Re-throw if it's a different error
    }

    // Store in Redis for future fast checks
    await storeFingerprint(fingerprintHash);

    return NextResponse.json(
      { 
        success: true,
        message: 'تم التصويت بنجاح',
        townId 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error processing vote:', error);
    
    // Don't expose internal errors to client
    return NextResponse.json(
      { error: 'حدث خطأ أثناء معالجة التصويت. يرجى المحاولة لاحقاً.' },
      { status: 500 }
    );
  }
}
