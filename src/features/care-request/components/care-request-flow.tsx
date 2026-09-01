'use client';

import React, { useState } from 'react';
import {
  CareRequestFormData,
  INITIAL_CARE_REQUEST_DATA,
} from '../types/care-request.types';
import { StepCategorySelect } from './step-category-select';
import { StepCreateDetails } from './step-create-details';
import { StepFeatureRequest } from './step-feature-request';

export function CareRequestFlow() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<CareRequestFormData>(
    INITIAL_CARE_REQUEST_DATA
  );

  const updateFormData = (fields: Partial<CareRequestFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  return (
    <div className="min-h-screen bg-white w-full">
      {step === 1 && (
        <StepCategorySelect
          data={formData}
          onChange={updateFormData}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <StepCreateDetails
          data={formData}
          onChange={updateFormData}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <StepFeatureRequest
          data={formData}
          onChange={updateFormData}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
}
