import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import {dummyInterviews} from "@/public/constants";
import InterviewCard from "@/components/InterviewCard";

const Page = () => {
  return (
    <>
    <section className="card-cta">
      <div className="flex flex-col gap-6 max-w-lg">
        <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
        <p className="text-lg">Practice job interview with AI</p>
        <Button asChild className="btn-primary max-sm:w-full">
          <Link href="/interview">Start an interview</Link>
        </Button>
      </div>

      <Image src="/robot.png" alt="robot-dude" width={400} height={400}  className="max-sm:hidden"  />
    </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
          ))}

          <p>You havn&apos;t posted any interview yet</p>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>

        <div className="interviews-section">
          <p>There are no interviews available</p>
        </div>
      </section>
    </>
  )
}

export default Page