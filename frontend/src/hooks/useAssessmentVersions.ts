import { useState, useEffect } from 'react';

export interface AssessmentVersionInfo {
  id: number;
  name: string;
}

export function useAssessmentVersions() {
  const [versions, setVersions] = useState<AssessmentVersionInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVersions();
  }, []);

  const fetchVersions = async () => {
    try {
      const response = await fetch('/api/assessments');
      const data = await response.json();
      setVersions(data);
    } catch (error) {
      console.error('Failed to fetch assessment versions:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    versions,
    loading,
  };
}

