import { Submission as ISubmission, Submissions as ISubmissions, SubmissionStatus } from "@xcpcio/types";

import {
  isAccepted,
  isRejected,
  isPending,
  isNotCalculatedPenaltyStatus,
  stringToSubmissionStatus,
} from "./submission-status";

export class Submission {
  id: string;
  teamId: string;
  problemId: string;
  timestamp: number;

  status = SubmissionStatus.UNKNOWN;
  isIgnore = false;

  constructor() {
    this.id = "";
    this.teamId = "";
    this.problemId = "";
    this.timestamp = 0;
  }

  isAccepted() {
    return isAccepted(this.status);
  }

  isRejected() {
    return isRejected(this.status);
  }

  isPending() {
    return isPending(this.status);
  }

  isNotCalculatedPenaltyStatus() {
    return isNotCalculatedPenaltyStatus(this.status);
  }
}

export type Submissions = Array<Submission>;

export function createSubmission(submissionJSON: ISubmission): Submission {
  const s = new Submission();

  s.id = submissionJSON.id ?? submissionJSON.submission_id ?? "";
  s.teamId = submissionJSON.team_id;
  s.problemId = String(submissionJSON.problem_id);
  s.timestamp = submissionJSON.timestamp;
  s.status = stringToSubmissionStatus(submissionJSON.status);
  s.isIgnore = submissionJSON.is_ignore ?? false;

  return s;
}

export function createSubmissions(submissionsJSON: ISubmissions): Submissions {
  if (Array.isArray(submissionsJSON)) {
    return submissionsJSON.map((s) => createSubmission(s));
  } else {
    const submissions = Object.entries(submissionsJSON).map(([submissionId, s]) =>
      createSubmission({ ...s, submission_id: s.submission_id ?? submissionId }),
    );
    return submissions;
  }
}
