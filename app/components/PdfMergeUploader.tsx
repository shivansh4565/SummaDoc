import { useRef, useState } from 'react';
import { FiUpload, FiTrash2, FiDownload, FiLoader } from 'react-icons/fi';

export default function PdfMergeUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const pdfs = Array.from(fileList).filter(f => f.type === 'application/pdf');
    setFiles(prev => [...prev, ...pdfs]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleMerge = async () => {
    setError(null);
    if (files.length < 2) {
      setError('Please select at least two PDF files to merge.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      files.forEach(f => formData.append('files', f));
      const res = await fetch('/api/merge', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('Failed to merge PDFs.');
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 mb-12">
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'
        }`}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => {
          const input = inputRef.current;
          if (input) input.click();
        }}
        style={{ cursor: 'pointer' }}
      >
        <FiUpload className="w-12 h-12 mx-auto mb-4 text-blue-500" />
        <h3 className="text-xl font-semibold mb-2">Drag & Drop PDFs Here</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          or click to browse your files
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h4 className="font-semibold mb-2">Selected PDFs:</h4>
          <ul className="mb-2 divide-y divide-gray-200 dark:divide-gray-700">
            {files.map((file, idx) => (
              <li key={idx} className="flex items-center justify-between py-2 text-sm">
                <span className="truncate max-w-xs">{file.name}</span>
                <button
                  className="text-red-500 hover:text-red-700 ml-2"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    handleRemove(idx);
                  }}
                  title="Remove"
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleMerge}
            disabled={loading || files.length < 2}
          >
            {loading ? <FiLoader className="animate-spin" /> : <FiDownload />} Merge & Download
          </button>
        </div>
      )}

      {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
    </div>
  );
}
