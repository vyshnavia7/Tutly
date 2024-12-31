"use client"

import { useState } from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Loader2 } from 'lucide-react';
import {ScrollArea,ScrollBar} from "@/components/ui/scroll-area";
import { IoMdDownload } from "react-icons/io";

type GenerateProps = {
  user: { username: string; name: string };
};

export default function StudentCertificate({ user }: GenerateProps) {
  const [isLoading, setIsLoading] = useState(false); 

  const downloadCertificate = () => {
    const certificateElement = document.getElementById("certificate");
    if (!certificateElement) return;

    setIsLoading(true);
    html2canvas(certificateElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `${user?.name}_Certificate.png`;
        link.click();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mx-auto">
      <AlertDialog open={isLoading}>
        <AlertDialogContent className="flex items-center justify-center">
          <AlertDialogDescription className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            Download in progress...
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>

      <Button
          onClick={downloadCertificate}
          className="mb-4"
        >
          <IoMdDownload className="h-6 w-6"/>
        </Button>

        <ScrollArea className="max-w-full">
        <div className="w-[800px] mx-auto">
          <div
            id="certificate"
            className="relative w-[800px] h-[566px]"
          >
          <img
            src="/gold_template.png"
            alt="Certificate"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-bold uppercase text-black w-[70%]">
            {user?.name}
          </div>
          <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-lg font-medium text-[#333] w-[75%] leading-relaxed">
            This certificate is awarded to{" "}
            <span className="font-bold">{user?.name}</span>, bearing roll number{" "}
            <span className="font-bold">{user?.username}</span>, for successfully
            completing the Web Development Course (MERN Stack). We recognize
            their dedication and hard work in acquiring the skills necessary for
            modern web development.
          </div>
          <div className="absolute top-[70%] left-16 flex flex-col items-center">
            <img src="/signature.png" alt="Signature" className="w-40 h-auto" />
            <p className="text-sm font-bold text-gray-600">Rajesh Thappeta</p>
            <p className="text-xs text-gray-600">Course Instructor</p>
          </div>
          <div className="absolute top-[88%] left-1/2 transform -translate-x-1/2 text-center text-sm font-semibold text-[#555]">
            Presented by <span className="text-blue-900">Tutly</span>
          </div>
        </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
