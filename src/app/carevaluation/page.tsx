"use client";
import React from "react";

import CarEvaluation from "@/app/carevaluation/carevaluation";
import HowItWorks from "@/app/carevaluation/howitswork";
import FaqAccordion from "@/app/carevaluation/faqaccordion";

export default function carevaluationPage() {
  return (
    <>
      <CarEvaluation />
      <HowItWorks />
      <FaqAccordion />
    </>
  );
}
