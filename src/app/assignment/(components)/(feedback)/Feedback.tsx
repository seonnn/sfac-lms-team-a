"use client";
import useGetFeedbacks from "@/hooks/reactQuery/feedback/useGetFeedbacks";
import React, { useState } from "react";
import FeedbackCard from "./FeedbackCard";
import Card from "../Card";
import { Feedback } from "@/types/firebase.types";
import { BaseProps } from "@/types/feedback.types";
import FeedbackCardSkeleton from "./FeedbackCardSkeleton";

export type UserFeedback = Pick<Feedback, Exclude<keyof Feedback, "id">>;

// 현재 수정중인 edit index를 갖고 있는게..
// docId === submittedAssignmentId
// 즉 Dynamic Route는 따로 되지 않으므로 나중에 submittedAssignment 클릭시 이벤트로 id 가져오기

const Feedback = ({ docId, userId, userData }: BaseProps) => {
  const { data, isLoading } = useGetFeedbacks(docId);

  const [isModalOn, setIsModalOn] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState<string | null>(null);

  if (isLoading) return <FeedbackCardSkeleton />;
  return (
    <>
      <section className="flex flex-col gap-[16px] mt-[16px]">
        {data?.map(feedback => {
          return (
            <Card key={feedback.id} vertical={true}>
              <FeedbackCard
                isFeedback={true}
                feedback={feedback}
                docId={docId}
                isModalOn={feedback.id === isModalOn}
                isEdit={feedback.id === isEdit}
                setIsEdit={setIsEdit}
                setIsModalOn={setIsModalOn}
                userId={userId}
                userData={userData}
              />
            </Card>
          );
        })}

        <Card vertical={true}>
          <FeedbackCard
            isEdit={false}
            isFeedback={false}
            docId={docId}
            setIsEdit={setIsEdit}
            setIsModalOn={setIsModalOn}
            userData={userData}
            userId={userId}
          />
        </Card>
      </section>
    </>
  );
};

export default Feedback;
