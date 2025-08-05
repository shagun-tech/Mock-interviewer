import { useEffect, useState } from "react";
import { fetchAllInterviews } from "@/services/services";
import InterviewItemCard from "./InterviewItemCard";
import PaginationSection from "../Pagination/PaginationSection";

export default function InterviewList() {
  const [interviewList, setInterviewList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const GetInterviewList = async () => {
    const data = await fetchAllInterviews();
    setInterviewList(data || []);
  };

  useEffect(() => {
    GetInterviewList();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = interviewList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl mb-5">Previous Mock Interviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.length > 0 ? (
          currentItems.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))
        ) : (
          <div className="flex items-center justify-center w-full border">
            <h2>No previous interview found</h2>
          </div>
        )}
      </div>

      {interviewList.length > itemsPerPage && (
        <div className="mt-6 flex justify-center">
          <PaginationSection
            totalItems={interviewList.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
