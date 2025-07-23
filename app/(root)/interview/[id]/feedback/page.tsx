import React from "react";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import Image from "next/image";
import star from "@/public/star.svg";
import calendar from "@/public/calendar.svg";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  console.log(feedback);

  const backToInterview = () => {
    redirect(`/interview/${id}`);
  };

  return (
    <div className="px-3 md:px-48">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[48px] font-bold capitalize text-center">
          Feedback on the Interview - {interview.role}
        </h1>
        <div className="w-full flex flex-col md:flex-row justify-center pb-3 gap-4 my-4 border-b border-gray-100">
          <span className="flex gap-2 color-light-100 text-[20px]">
            <Image src={star} alt="star" />{" "}
            <p>Overall Impression: {feedback?.totalScore}</p>
          </span>
          <span className="flex gap-2 color-light-100 text-[20px]">
            <Image src={calendar} alt={calendar} />
            <p>
              {dayjs(feedback?.createdAt).format("MMM D, YYYY h:mm A")}
            </p>{" "}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-start">
        <h2 className="text-5xl">Breakdown of Evaluation:</h2>
        {feedback?.categoryScores.map((categoryScore, index) => (
          <div key={categoryScore.name}>
            <h4 className="text-[18px] font-bold my-4">
              {index + 1}. {categoryScore.name} ({categoryScore.score}/20)
            </h4>
            <ul>
              <li className="list-none">{categoryScore.comment}</li>
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-2 justify-around mt-10">
        <Button
          variant="secondary"
          size="lg"
          className="rounded-full btn-secondary w-full flex-1"
        >
          <Link href="/">Back to dashbaord</Link>
        </Button>
        <Button className="rounded-full btn-primary w-full flex-1" size="lg">
          <Link href={`/interview/${id}`}>Retake Interview</Link>
        </Button>
      </div>
    </div>
  );
};
export default Page;
