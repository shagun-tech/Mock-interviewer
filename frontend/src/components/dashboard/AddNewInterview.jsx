import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JobContext } from "@/context/jobcontext";
import { dialogFormControls } from "@/config/config";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CommonForm from "../common-form/CommonForm";

export default function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const { dialogFormData, setDialogFormData, handleDialogSubmit, loading } = useContext(JobContext);

  const handleSubmitAndClose = async (e) => {
    const result = await handleDialogSubmit(e);

    setOpenDialog(false);
    if (result?.success) {
      const mockId = result?.data?.mockId;
      navigate(`/home/interview/${mockId}`);
    } else {
      navigate("/home/error");
    }
  };

  return (
    <div>
      <div
        className="py-10 px-20 border rounded-lg bg-secondary hover:scale-105 hover:shadow-lg cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about the Job</DialogTitle>
            <DialogDescription>
              Add details about the job position, your skills, and years of experience.
            </DialogDescription>
          </DialogHeader>
          <CommonForm
            handleSubmit={handleSubmitAndClose}
            formControls={dialogFormControls}
            formData={dialogFormData}
            setFormData={setDialogFormData}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
