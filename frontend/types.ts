export type PatientData = Record<string, any>;

export type RawTrial = {
  protocolSection?: {
    identificationModule?: {
      nctId?: string;
      briefTitle?: string;
    };
    statusModule?: {
      overallStatus?: string;
    };
  };
  [key: string]: any;
};

export type TrialListProps = {
  patient: PatientData;
  trials: RawTrial[];
};

export type ExtractedResponse = {
  patient: PatientData;
  trials: RawTrial[];
};

export type TranscriptInputProps = {
  onResults: (data: ExtractedResponse) => void;
};
