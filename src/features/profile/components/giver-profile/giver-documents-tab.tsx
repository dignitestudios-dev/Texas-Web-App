'use client';

import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentItem {
  id: string;
  title: string;
  category: string;
  fileName?: string;
  status: 'verified' | 'pending' | 'not_uploaded';
  updatedAt?: string;
}

export function GiverDocumentsTab() {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: '1',
      title: "Government-Issued ID / Driver's License",
      category: 'Identity Verification',
      fileName: 'drivers_license_texas.pdf',
      status: 'verified',
      updatedAt: 'Verified on Jan 12, 2026',
    },
    {
      id: '2',
      title: 'CPR & First Aid Certification',
      category: 'Medical Training',
      fileName: 'cpr_cert_card_2026.pdf',
      status: 'verified',
      updatedAt: 'Verified on Feb 05, 2026',
    },
    {
      id: '3',
      title: 'Certified Nursing Assistant (CNA) Certificate',
      category: 'Professional License',
      fileName: 'cna_license_tx.pdf',
      status: 'verified',
      updatedAt: 'Verified on Jan 20, 2026',
    },
    {
      id: '4',
      title: 'Criminal Background Check Clearance',
      category: 'Safety Compliance',
      fileName: 'background_check_clearance.pdf',
      status: 'verified',
      updatedAt: 'Verified on Feb 15, 2026',
    },
  ]);

  const handleFileUpload = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit');
        return;
      }
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === docId
            ? {
                ...doc,
                fileName: file.name,
                status: 'pending',
                updatedAt: 'Under Review',
              }
            : doc
        )
      );
      toast.success(`Uploaded ${file.name} for verification.`);
    }
  };

  const handleRemove = (docId: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              fileName: undefined,
              status: 'not_uploaded',
              updatedAt: undefined,
            }
          : doc
      )
    );
    toast.success('Document removed');
  };

  const handleSave = () => {
    toast.success('Documents updated successfully!');
  };

  return (
    <div className="flex flex-col gap-[30px] w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-rubik font-medium text-[24px] leading-[28px] capitalize text-[#121111]">
          Verification Documents
        </h2>
        <p className="font-rubik font-light text-[14px] leading-[17px] capitalize text-[#3D3D3D]">
          Upload your licenses, identity proof, and certifications to maintain your verified status.
        </p>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#F8F9FF] border border-[#E4E4E7] rounded-[16px] p-5 flex flex-col justify-between gap-4 shadow-xs"
          >
            {/* Top row: Title + Status Badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <span className="font-rubik text-[12px] font-medium text-[#F36922] uppercase tracking-wider">
                  {doc.category}
                </span>
                <h3 className="font-rubik font-medium text-[15px] text-[#121111] leading-snug">
                  {doc.title}
                </h3>
              </div>

              {doc.status === 'verified' && (
                <div className="flex items-center gap-1 bg-[#E6F4EA] text-[#046C4E] px-2.5 py-1 rounded-full text-[12px] font-rubik font-medium shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              )}

              {doc.status === 'pending' && (
                <div className="flex items-center gap-1 bg-[#FEF0E9] text-[#F36922] px-2.5 py-1 rounded-full text-[12px] font-rubik font-medium shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Pending</span>
                </div>
              )}
            </div>

            {/* Middle: File info or upload prompt */}
            {doc.fileName ? (
              <div className="flex items-center justify-between bg-white border border-[#E4E4E7] rounded-[12px] p-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <FileText className="w-5 h-5 text-[#0A0A6E] shrink-0" />
                  <div className="flex flex-col truncate">
                    <span className="font-rubik font-normal text-[13px] text-[#121111] truncate">
                      {doc.fileName}
                    </span>
                    {doc.updatedAt && (
                      <span className="font-rubik font-light text-[11px] text-[#565656]">
                        {doc.updatedAt}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <label className="p-1.5 hover:bg-neutral-100 rounded-[8px] cursor-pointer text-[#0A0A6E] transition" title="Replace File">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => handleFileUpload(doc.id, e)}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemove(doc.id)}
                    className="p-1.5 hover:bg-red-50 text-[#C81E1E] rounded-[8px] cursor-pointer transition border-none bg-transparent"
                    title="Remove File"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <label className="border border-dashed border-[#E4E4E7] bg-white hover:bg-[#EEF0F8] rounded-[12px] p-4 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition text-center">
                <Upload className="w-5 h-5 text-[#0A0A6E]" />
                <span className="font-rubik font-medium text-[13px] text-[#0A0A6E]">
                  Upload Document
                </span>
                <span className="font-rubik font-light text-[11px] text-[#565656]">
                  PDF, PNG, JPG up to 10MB
                </span>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileUpload(doc.id, e)}
                  className="hidden"
                />
              </label>
            )}
          </div>
        ))}
      </div>

      {/* Save Button Footer */}
      <div className="flex justify-end w-full pt-2">
        <button
          type="button"
          onClick={handleSave}
          className="w-[71px] h-[36px] bg-[#F36922] hover:bg-[#e05813] text-white rounded-[8px] font-rubik font-medium text-[15px] leading-[135%] capitalize flex items-center justify-center transition cursor-pointer border-none shadow-2xs"
        >
          Save
        </button>
      </div>
    </div>
  );
}
