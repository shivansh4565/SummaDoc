import { NextRequest, NextResponse } from 'next/server';
import PDFMerger from 'pdf-merger-js';

export const runtime = 'nodejs'; // Required for Buffer and file handling

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files');

    if (!files || files.length < 2) {
      return NextResponse.json(
        { error: 'Please upload at least two PDF files.' },
        { status: 400 }
      );
    }

    const merger = new PDFMerger();
    let validPdfCount = 0;

    for (const file of files) {
      if (
        typeof file === 'object' &&
        'arrayBuffer' in file &&
        file.type === 'application/pdf'
      ) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        if (buffer.length > 0) {
          await merger.add(buffer);
          validPdfCount++;
        }
      }
    }

    if (validPdfCount < 2) {
      return NextResponse.json(
        { error: 'Please upload at least two valid PDF files.' },
        { status: 400 }
      );
    }
    
    const mergedPdfBuffer = await merger.saveAsBuffer();

    return new NextResponse(
      new Blob([new Uint8Array(mergedPdfBuffer)], { type: 'application/pdf' }),
      {
        status: 200,
        headers: {
          'Content-Disposition': 'attachment; filename="Merged.pdf"',
        },
      }
    );
    
  } catch (error) {
    console.error('Merge Error:', error);
    return NextResponse.json(
      { error: 'Failed to merge PDFs. Please try again.' },
      { status: 500 }
    );
  }
}
