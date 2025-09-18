// For Internship Applicants
export interface InternshipApplication {
  name: string;
  email: string;
  phone?: string;
  university: string;
  fieldOfInterest: string;
  cvUrl: string;
  coverLetter?: string;
  appliedAt: string;
  status?: 'Pending' | 'Reviewed';
}

// For Positions like Project Assistant/Associate
export interface PositionApplication {
  name: string;
  email: string;
  phone?: string;
  highestQualification: string;
  currentPosition?: string;
  cvUrl: string;
  coverLetter?: string;
  appliedAt: string;
  status?: 'Pending' | 'Reviewed';
}

// For PhD Applicants
export interface PhdApplication {
  name: string;
  email: string;
  phone?: string;
  bachelorsDegree: string; // e.g., "B.Tech in Mechanical Engineering, 8.5 CGPA"
  mastersDegree?: string;  // e.g., "M.Tech in Materials Science, 9.0 CGPA"
  qualifyingExam?: string; // e.g., "GATE Score: 750, Rank: 123"
  statementOfPurposeUrl: string;
  cvUrl: string;
  appliedAt: string;
  status?: 'Pending' | 'Reviewed';
}